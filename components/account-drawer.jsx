"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAccount } from "@/actions/dashboard";
import { updateAccount } from "@/actions/account";
import { accountSchema } from "@/app/lib/schema";

export function AccountDrawer({ children, account }) {
    const [open, setOpen] = useState(false);
    const isEditMode = !!account;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: account?.name || "",
            type: account?.type || "CURRENT",
            balance: account?.balance?.toString() || "",
            isDefault: account?.isDefault || false,
            isIncludedInBudget: account?.isIncludedInBudget ?? true,
        },
    });

    // Create Account Action
    const {
        loading: createAccountLoading,
        fn: createAccountFn,
        error: createError,
        data: newAccount,
    } = useFetch(createAccount);

    // Update Account Action
    const {
        loading: updateAccountLoading,
        fn: updateAccountFn,
        error: updateError,
        data: updatedAccount,
    } = useFetch(updateAccount);

    const onSubmit = async (data) => {
        if (isEditMode) {
            await updateAccountFn(account.id, data);
        } else {
            await createAccountFn(data);
        }
    };

    const isLoading = createAccountLoading || updateAccountLoading;
    const error = createError || updateError;

    useEffect(() => {
        if (newAccount || updatedAccount) {
            toast.success(
                isEditMode
                    ? "Account updated successfully"
                    : "Account created successfully"
            );
            if (!isEditMode) reset(); // Only reset on create
            setOpen(false);
        }
    }, [newAccount, updatedAccount, isEditMode, reset]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to save account");
        }
    }, [error]);

    // Reset form when drawer opens/closes or account changes
    useEffect(() => {
        if (open) {
            reset({
                name: account?.name || "",
                type: account?.type || "CURRENT",
                balance: account?.balance?.toString() || "",
                isDefault: account?.isDefault || false,
            });
        }
    }, [open, account, reset]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        {isEditMode ? "Edit Account" : "Create New Account"}
                    </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Account Name
                            </label>
                            <Input
                                id="name"
                                placeholder="e.g., Main Checking"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="type"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Account Type
                            </label>
                            <Select
                                onValueChange={(value) => setValue("type", value)}
                                defaultValue={watch("type")}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CURRENT">Current</SelectItem>
                                    <SelectItem value="SAVINGS">Savings</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-sm text-red-500">{errors.type.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="balance"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {isEditMode ? "Current Balance" : "Initial Balance"}
                            </label>
                            <Input
                                id="balance"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register("balance")}
                            />
                            {errors.balance && (
                                <p className="text-sm text-red-500">{errors.balance.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <label
                                    htmlFor="isIncludedInBudget"
                                    className="text-base font-medium cursor-pointer"
                                >
                                    Include in Budget
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    This account's transactions will be included in your monthly budget
                                </p>
                            </div>
                            <Switch
                                id="isIncludedInBudget"
                                checked={watch("isIncludedInBudget")}
                                onCheckedChange={(checked) => setValue("isIncludedInBudget", checked)}
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <DrawerClose asChild>
                                <Button type="button" variant="outline" className="flex-1">
                                    Cancel
                                </Button>
                            </DrawerClose>
                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {isEditMode ? "Updating..." : "Creating..."}
                                    </>
                                ) : isEditMode ? (
                                    "Update Account"
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
