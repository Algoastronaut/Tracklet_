"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { generateDashboardInsights } from "@/actions/dashboard";
import { cn } from "@/lib/utils";

export function DashboardInsights() {
    const [insights, setInsights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const data = await generateDashboardInsights();
            setInsights(data);
            setHasGenerated(true);
        } catch (error) {
            console.error("Failed to generate insights:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-gray-200/60 dark:border-gray-800 bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI Insights
                </CardTitle>
                {!hasGenerated && (
                    <Button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        variant="outline"
                        size="sm"
                        className="border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 dark:border-purple-900 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 dark:text-purple-300"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>Generate</>
                        )}
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {!hasGenerated ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p>Get AI-powered recommendations based on your recent activity.</p>
                        </div>
                    ) : (
                        <>
                            {insights.map((insight, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/50"
                                >
                                    <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {insight}
                                    </p>
                                </div>
                            ))}
                            <div className="flex justify-end mt-2">
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    {isLoading ? "Refreshing..." : "Refresh Insights"}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
