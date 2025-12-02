"use server";

import { db } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const serializeDecimal = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function getAccountWithTransactions(accountId) {
  const userId = await getUserIdFromToken();

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });

  if (!account) return null;

  return {
    ...serializeDecimal(account),
    transactions: account.transactions.map(serializeDecimal),
  };
}

export async function bulkDeleteTransactions(transactionIds) {
  try {
    const userId = await getUserIdFromToken();

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    // Get transactions to calculate balance changes
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Group transactions by account to update balances
    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? transaction.amount
          : -transaction.amount;
      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    // Delete transactions and update account balances in a transaction
    await db.$transaction(async (tx) => {
      // Delete transactions
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Update account balances
      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}



export async function updateAccount(id, data) {
  try {
    const userId = await getUserIdFromToken();

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updateData = {
      ...data,
      isIncludedInBudget: data.isIncludedInBudget,
    };

    // Only update balance if it's provided
    if (data.balance) {
      const balanceFloat = parseFloat(data.balance);
      if (isNaN(balanceFloat)) {
        throw new Error("Invalid balance amount");
      }
      updateData.balance = balanceFloat;
    }

    const account = await db.account.update({
      where: {
        id,
        userId: user.id,
      },
      data: updateData,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${id}`);
    return { success: true, data: serializeDecimal(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteAccount(id) {
  try {
    const userId = await getUserIdFromToken();

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if account exists and belongs to user
    const account = await db.account.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    // Delete account (transactions will be cascaded due to schema)
    await db.account.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
