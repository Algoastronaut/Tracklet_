import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 relative overflow-hidden pt-20 pb-16">
      {/* Sophisticated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-100/40 dark:from-violet-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 dark:from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            Get a clear snapshot of your accounts, spending, and monthly budget in one beautiful view.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="mt-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-8">
              <BarLoader width={"100%"} color="#8b5cf6" />
            </div>
          }
        >
          <div className="mt-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] p-6 sm:p-8 lg:p-10">
            <DashboardPage />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
