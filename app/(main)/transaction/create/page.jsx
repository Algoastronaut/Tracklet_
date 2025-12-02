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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 relative overflow-hidden pt-20 pb-16">
      {/* Sophisticated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-100/40 dark:from-violet-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 dark:from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
            {editId ? "Edit Transaction" : "Add Transaction"}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            {editId
              ? "Fine‑tune the details of this transaction to keep your history accurate."
              : "Capture income or expenses with rich details so your dashboard stays up to date."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Main form card */}
          <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-6 sm:p-8 lg:p-10">
            <AddTransactionForm
              accounts={accounts}
              categories={defaultCategories}
              editMode={!!editId}
              initialData={initialData}
            />
          </div>

          {/* Side panel */}
          <div className="hidden lg:block rounded-3xl bg-gradient-to-br from-violet-50/80 dark:from-violet-950/30 via-white dark:via-gray-900 to-blue-50/80 dark:to-blue-950/30 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-6 lg:p-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-3">
                  Smart Spending
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  See the impact of this transaction immediately on your accounts and dashboard insights.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                    Quick tips
                  </span>
                </div>
                <ul className="space-y-3.5 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 shadow-sm"></span>
                    <span className="leading-relaxed">Use clear descriptions so you can recognize transactions at a glance.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 shadow-sm"></span>
                    <span className="leading-relaxed">Categorize consistently to get accurate charts and breakdowns.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0 shadow-sm"></span>
                    <span className="leading-relaxed">Turn on recurring for subscriptions, rent, or regular income.</span>
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
