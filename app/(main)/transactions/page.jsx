import { getTransactions } from "@/actions/transaction";
import { TransactionTable } from "../account/_components/transaction-table";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default async function TransactionsPage(props) {
    const searchParams = await props.searchParams;
    const { transactions, totalPages, currentPage } = await getTransactions({
        limit: 10,
        page: Number(searchParams.page) || 1,
        type: searchParams.type,
        recurring: searchParams.recurring,
        search: searchParams.search,
        dateRange: {
            from: searchParams.from,
            to: searchParams.to,
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold gradient-title">Transaction History</h1>
            </div>
            <Suspense
                fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
            >
                <TransactionTable
                    transactions={transactions}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </Suspense>
        </div>
    );
}
