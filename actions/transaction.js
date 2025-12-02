"use server";

import { db } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";

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

export async function getTransactions({
  accountId,
  type,
  recurring,
  dateRange,
  search,
  page = 1,
  limit = 10,
}) {
  try {
    const userId = await getUserIdFromToken();

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const where = {
      userId: user.id,
    };

    // Filter by Account
    if (accountId) {
      where.accountId = accountId;
    } else {
      // If no specific account, only show included accounts (for "All Transactions" view)
      // We need to fetch accounts first to know which ones are included
      const accounts = await db.account.findMany({
        where: { userId: user.id, isIncludedInBudget: true },
        select: { id: true }
      });
      where.accountId = { in: accounts.map(a => a.id) };
    }

    // Filter by Type
    if (type) {
      where.type = type;
    }

    // Filter by Recurring
    if (recurring === "recurring") {
      where.isRecurring = true;
    } else if (recurring === "non-recurring") {
      where.isRecurring = false;
    }

    // Filter by Search
    if (search) {
      where.description = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Filter by Date Range
    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      const toDate = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);
      toDate.setHours(23, 59, 59, 999);

      where.date = {
        gte: fromDate,
        lte: toDate,
      };
    }

    const skip = (page - 1) * limit;

    const [transactions, totalCount] = await Promise.all([
      db.transaction.findMany({
        where,
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      db.transaction.count({ where }),
    ]);

    return {
      transactions: transactions.map(serializeTransaction),
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}
