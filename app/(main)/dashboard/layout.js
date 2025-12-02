import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="px-5 py-6 lg:py-10 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-900 min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-title">
              Dashboard
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              Get a clear snapshot of your accounts, spending, and monthly
              budget in one beautiful view.
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-inner">
              <BarLoader width={"100%"} color="#a855f7" />
            </div>
          }
        >
          <div className="mt-4 rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 sm:p-6 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
            <DashboardPage />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
