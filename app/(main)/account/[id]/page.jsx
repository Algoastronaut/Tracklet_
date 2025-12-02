import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export const dynamic = "force-dynamic";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  const humanType =
    account.type.charAt(0) + account.type.slice(1).toLowerCase();

  return (
    <div className="px-5 py-6 lg:py-10 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-900 min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-title capitalize">
              {account.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              {humanType} account overview with live balance and transaction
              history.
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-1 pt-1">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Current balance
            </span>
            <span className="text-2xl sm:text-3xl font-semibold tabular-nums text-slate-50">
              ${parseFloat(account.balance).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400">
              {account._count.transactions} transaction
              {account._count.transactions === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Left: chart + table */}
          <div className="space-y-6">
            <Suspense
              fallback={
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <BarLoader width={"100%"} color="#a855f7" />
                </div>
              }
            >
              <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 sm:p-5 backdrop-blur-xl shadow-[0_18px_40px_rgba(15,23,42,0.9)]">
                <AccountChart transactions={transactions} />
              </div>
            </Suspense>

            <Suspense
              fallback={
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <BarLoader width={"100%"} color="#a855f7" />
                </div>
              }
            >
              <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 sm:p-5 backdrop-blur-xl shadow-[0_18px_40px_rgba(15,23,42,0.9)]">
                <TransactionTable transactions={transactions} />
              </div>
            </Suspense>
          </div>

          {/* Right: info panel */}
          <div className="hidden lg:block rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.85)] space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80 mb-1.5">
                Account Snapshot
              </p>
              <p className="text-sm text-slate-200">
                Quickly review this account&apos;s balance, activity, and how it
                fits into your overall dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Balance
                </span>
                <span className="text-lg font-semibold tabular-nums text-slate-50">
                  ${parseFloat(account.balance).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Type
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-100">
                  {humanType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Transactions
                </span>
                <span className="text-xs text-slate-200">
                  {account._count.transactions} total
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 space-y-2">
              <span className="text-xs font-medium text-slate-400">
                Tips for this account
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Use this as your default account if it&apos;s your primary
                  spending source.
                </li>
                <li className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Keep descriptions meaningful so patterns stand out in charts.
                </li>
                <li className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Pair this with a monthly budget to stay in control of
                  expenses.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
