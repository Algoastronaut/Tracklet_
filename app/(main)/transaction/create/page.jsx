import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export const dynamic = "force-dynamic";

export default async function AddTransactionPage(props) {
  const searchParams = await props.searchParams;
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="px-5 py-6 lg:py-10 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-900 min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-title">
              {editId ? "Edit Transaction" : "Add Transaction"}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              {editId
                ? "Fine‑tune the details of this transaction to keep your history accurate."
                : "Capture income or expenses with rich details so your dashboard stays up to date."}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Main form card – lighter to mirror dashboard content */}
          <div className="rounded-3xl border border-slate-200/70 bg-slate-50/95 p-4 sm:p-6 shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
            <AddTransactionForm
              accounts={accounts}
              categories={defaultCategories}
              editMode={!!editId}
              initialData={initialData}
            />
          </div>

          <div className="hidden lg:block rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.85)]">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80 mb-1.5">
                  Smart Spending
                </p>
                <p className="text-sm text-slate-200">
                  See the impact of this transaction immediately on your
                  accounts and dashboard insights.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    Quick tips
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Use clear descriptions so you can recognize transactions at
                    a glance.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                    Categorize consistently to get accurate charts and
                    breakdowns.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-violet-400" />
                    Turn on recurring for subscriptions, rent, or regular
                    income.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
