import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { TransactionTable } from "../account/_components/transaction-table";

export default async function TransactionsPage() {
    const [accounts, transactions] = await Promise.all([
        getUserAccounts(),
        getDashboardData(),
    ]);

    // Filter transactions for accounts included in the budget
    const budgetTransactions = transactions.filter((t) => {
        const account = accounts.find((a) => a.id === t.accountId);
        return account?.isIncludedInBudget;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold gradient-title">Transaction History</h1>
            </div>
            <TransactionTable transactions={budgetTransactions} />
        </div>
    );
}
