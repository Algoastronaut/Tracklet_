"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard, Star, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateAccount } from "@/actions/account";
import { toast } from "sonner";
import { AccountDrawer } from "@/components/account-drawer";

export function AccountCard({ account }) {
  const { name, type, balance, id, isIncludedInBudget } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateAccount);

  const handleDefaultChange = async (checked) => {
    await updateDefaultFn(id, { isIncludedInBudget: checked });
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Account budget status updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update account");
    }
  }, [error]);

  return (
    <Card className="group relative overflow-hidden border border-gray-200/60 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-violet-300/60 dark:hover:border-violet-600/60 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)] dark:hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <Link href={`/account/${id}`} className="relative block">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 pt-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <CardTitle className="text-base font-semibold capitalize text-gray-900 dark:text-gray-100">
                {name}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
              <CreditCard className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
              {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              <AccountDrawer account={account}>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                </div>
              </AccountDrawer>
              <div
                className="flex flex-col items-end"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
                  Budget
                </span>
                <Switch
                  checked={isIncludedInBudget}
                  onCheckedChange={handleDefaultChange}
                  disabled={updateDefaultLoading}
                  className="data-[state=checked]:bg-violet-600"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          <div className="text-3xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Keep an eye on this account&apos;s day‑to‑day activity and balance changes.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between pt-4 pb-5 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <ArrowDownRight className="h-3.5 w-3.5 text-rose-500" />
            <span>Expenses</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
