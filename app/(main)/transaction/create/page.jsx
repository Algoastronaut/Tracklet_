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
    <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 min-h-[calc(100vh-80px)] py-8 sm:py-10">
      <div className="max-w-3xl mx-auto px-5">
        <div className="mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight gradient-title">
            {editId ? "Edit Transaction" : "Add Transaction"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl">
            {editId
              ? "Fine‑tune the details of this transaction to keep your history accurate."
              : "Capture income or expenses with rich details so your dashboard stays up to date."}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.95)] backdrop-blur-xl">
          <AddTransactionForm
            accounts={accounts}
            categories={defaultCategories}
            editMode={!!editId}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}
