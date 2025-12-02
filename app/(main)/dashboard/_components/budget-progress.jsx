"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  // Prefer the latest budget returned from the server action,
  // fall back to the initial budget from the server component.
  const activeBudget = updatedBudget?.success ? updatedBudget.data : initialBudget;

  const percentUsed = activeBudget
    ? (currentExpenses / activeBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(activeBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      // Sync input with the latest value that was saved
      setNewBudget(updatedBudget.data.amount.toString());
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card className="border border-gray-200/60 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex-1">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Monthly Budget (Default Account)
          </CardTitle>
          <div className="flex items-center gap-3 mt-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-36 h-9 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-violet-500 focus:ring-violet-500"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                  className="h-9 w-9 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                >
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="h-9 w-9 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  {activeBudget
                    ? `$${currentExpenses.toFixed(
                        2
                      )} of $${activeBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Pencil className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeBudget && (
          <div className="space-y-3">
            <Progress
              value={percentUsed}
              extraStyles={`${
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                    ? "bg-yellow-500"
                    : "bg-emerald-500"
              }`}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 text-right font-medium">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
