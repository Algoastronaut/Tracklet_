import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { AccountTransactionTable } from "../_components/account-transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export const dynamic = "force-dynamic";

export default async function AccountPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  const humanType =
    account.type.charAt(0) + account.type.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 relative overflow-hidden pt-20 pb-16">
      {/* Sophisticated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-100/40 dark:from-violet-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 dark:from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight capitalize mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
              {account.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {humanType} account overview with live balance and transaction history.
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-2 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Current balance
            </span>
            <span className="text-3xl sm:text-4xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
              ${parseFloat(account.balance).toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {account._count.transactions} transaction
              {account._count.transactions === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Left: chart + table */}
          <div className="space-y-8">
            <Suspense
              fallback={
                <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-8">
                  <BarLoader width={"100%"} color="#8b5cf6" />
                </div>
              }
            >
              <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-6 sm:p-8">
                <AccountChart transactions={transactions} />
              </div>
            </Suspense>

            <Suspense
              fallback={
                <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-8">
                  <BarLoader width={"100%"} color="#8b5cf6" />
                </div>
              }
            >
              <AccountTransactionTable accountId={params.id} searchParams={searchParams} />
            </Suspense>
          </div>

          {/* Right: info panel */}
          <div className="hidden lg:block rounded-3xl bg-gradient-to-br from-violet-50/80 dark:from-violet-950/30 via-white dark:via-gray-900 to-blue-50/80 dark:to-blue-950/30 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-6 lg:p-8 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-3">
                Account Snapshot
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Quickly review this account&apos;s balance, activity, and how it fits into your overall dashboard.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Balance
                </span>
                <span className="text-lg font-bold tabular-nums text-gray-900 dark:text-gray-100">
                  ${parseFloat(account.balance).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Type
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 font-bold">
                  {humanType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Transactions
                </span>
                <span className="text-sm text-gray-900 dark:text-gray-100 font-bold">
                  {account._count.transactions} total
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700 p-6 space-y-4">
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                Tips for this account
              </span>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3 items-start">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 shadow-sm"></span>
                  <span className="leading-relaxed">Use this as your default account if it&apos;s your primary spending source.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 shadow-sm"></span>
                  <span className="leading-relaxed">Keep descriptions meaningful so patterns stand out in charts.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0 shadow-sm"></span>
                  <span className="leading-relaxed">Pair this with a monthly budget to stay in control of expenses.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
