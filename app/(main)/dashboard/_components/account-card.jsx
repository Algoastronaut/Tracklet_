"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard, Star } from "lucide-react";
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
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="group relative overflow-hidden border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950/90 hover:border-violet-500/80 hover:shadow-[0_18px_40px_rgba(88,28,135,0.65)] transition-all duration-300">
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.2),_transparent_55%)]" />
      <Link href={`/account/${id}`} className="relative block">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold capitalize text-slate-50">
                {name}
              </CardTitle>
              {isDefault && (
                <Badge className="flex items-center gap-1 bg-violet-600/90 text-xs text-white border border-violet-400/60">
                  <Star className="h-3 w-3 fill-current" />
                  Default
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-slate-400">
              <CreditCard className="h-3 w-3 text-slate-500" />
              {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-wide text-slate-400">
              Default for dashboard
            </span>
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-violet-600"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl font-semibold tabular-nums text-slate-50">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-slate-400">
            Keep an eye on this account&apos;s day‑to‑day activity and balance
            changes.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
            <span>Income inflows</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowDownRight className="h-3.5 w-3.5 text-rose-400" />
            <span>Expense outflows</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
