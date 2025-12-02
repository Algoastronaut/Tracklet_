"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to sign in");
        return;
      }

      toast.success("Signed in successfully!");
      // Dispatch event to update header
      window.dispatchEvent(new Event("user-logged-in"));
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 dark:from-gray-950 via-white dark:via-gray-900 to-violet-50/30 dark:to-violet-950/20 p-4 pt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200/20 dark:bg-violet-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-100/10 dark:from-violet-900/10 to-blue-100/10 dark:to-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8 text-center lg:text-left">
          <div className="space-y-5">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gray-900 dark:text-gray-100">Welcome back to</span>
              <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mt-2">
                Tracklet
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Your intelligent finance companion. Sign in to continue managing your finances with ease and precision.
            </p>
          </div>
          <div className="flex flex-col gap-5 pt-6">
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <span className="font-medium">Track expenses and income effortlessly</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <span className="font-medium">Smart budgeting and insights</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <span className="font-medium">Secure and private</span>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full">
          <Card className="border border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600"></div>
            <CardHeader className="space-y-2 pt-8 pb-6 text-center lg:text-left">
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">Sign In</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 text-base">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500 h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold h-12 mt-6 shadow-lg hover:shadow-xl transition-all" 
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Don&apos;t have an account? </span>
                <Link href="/sign-up" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-semibold transition-colors">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
