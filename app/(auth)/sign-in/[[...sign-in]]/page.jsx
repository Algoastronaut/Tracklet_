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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 pt-20">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Welcome back to
              <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Tracklet
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-md">
              Your intelligent finance companion. Sign in to continue managing your finances with ease.
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span>Track expenses and income effortlessly</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span>Smart budgeting and insights</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-semibold">✓</span>
              </div>
              <span>Secure and private</span>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full">
          <Card className="border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-3 text-center lg:text-left">
              <CardTitle className="text-3xl font-bold text-white">Sign In</CardTitle>
              <CardDescription className="text-slate-400">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 h-11"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold h-11 mt-6" 
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-slate-400">Don&apos;t have an account? </span>
                <Link href="/sign-up" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
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
