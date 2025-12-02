import { getTransactions } from "@/actions/transaction";
import { TransactionTable } from "./transaction-table";

export async function AccountTransactionTable({ accountId, searchParams }) {
    const { transactions, totalPages, currentPage } = await getTransactions({
        accountId,
        limit: 10,
        page: Number(searchParams?.page) || 1,
        type: searchParams?.type,
        recurring: searchParams?.recurring,
        search: searchParams?.search,
        dateRange: {
            from: searchParams?.from,
            to: searchParams?.to,
        },
    });

    return (
        <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-6 sm:p-8">
            <TransactionTable
                transactions={transactions}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
}
