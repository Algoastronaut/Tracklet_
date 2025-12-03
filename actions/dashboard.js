"use server";

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { getUserIdFromToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function getUserAccounts() {
  const userId = await getUserIdFromToken();

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    const serializedAccounts = accounts.map(serializeTransaction);
    return serializedAccounts;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createAccount(data) {
  try {
    const userId = await getUserIdFromToken();

    const req = await request();

    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new Error("Too many requests. Please try again later.");
      }
      throw new Error("Request blocked");
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeIncluded =
      existingAccounts.length === 0 ? true : data.isIncludedInBudget;

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isIncludedInBudget: shouldBeIncluded,
      },
    });

    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDashboardData() {
  const userId = await getUserIdFromToken();

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateDashboardInsights() {
  const userId = await getUserIdFromToken();

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { accounts: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Fetch recent transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 20, // Analyze last 20 transactions
  });

  // Calculate some basic stats to feed the AI
  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount.toNumber(), 0);

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amount.toNumber(), 0);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("GEMINI_API_KEY Status:", process.env.GEMINI_API_KEY ? "Present" : "Missing");
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
    Analyze this financial data for a user and provide 3 concise, actionable, and friendly insights/recommendations.
    Focus on spending habits, savings opportunities, or budget adherence.
    Do not mention specific dates or transaction IDs.
    
    Financial Data:
    - Total Recent Expenses: $${totalExpenses}
    - Total Recent Income: $${totalIncome}
    - Recent Transactions: ${transactions
      .map(
        (t) =>
          `${t.date.toISOString().split("T")[0]}: ${t.description} ($${t.amount})`
      )
      .join(", ")}
      
    Format the response as a JSON array of strings, like this:
    ["Insight 1", "Insight 2", "Insight 3"]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      "Error: Failed to generate insights. Please try again later.",
      `Details: ${error.message}`,
      "Ensure your GEMINI_API_KEY is correctly configured.",
    ];
  }
}
