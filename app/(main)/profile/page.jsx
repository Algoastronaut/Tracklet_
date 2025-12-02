"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/user";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const {
    loading,
    fn: updateProfileFn,
    data: result,
  } = useFetch(updateProfile);

  // Load current user info
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/sign-in");
          return;
        }
        const data = await res.json();
        setEmail(data.user.email || "");
        setName(data.user.name || "");
      } catch (e) {
        toast.error("Failed to load profile");
      } finally {
        setInitialLoading(false);
      }
    };

    loadUser();
  }, [router]);

  // Handle success
  useEffect(() => {
    if (result?.success && !loading) {
      toast.success("Profile updated");
      // Dispatch event to update header
      window.dispatchEvent(new Event("user-logged-in"));
      router.push("/");
      router.refresh();
    }
  }, [result, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfileFn({ name });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 relative overflow-hidden pt-20 pb-16">
      {/* Sophisticated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-100/40 dark:from-violet-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 dark:from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
            Update how your name appears across Tracklet. Your email is used for login and notifications.
          </p>
        </div>

        <Card className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500"></div>
          <CardHeader className="pt-10 pb-6 px-6 sm:px-8 lg:px-10">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Account details</CardTitle>
          </CardHeader>
          <CardContent className="pb-10 px-6 sm:px-8 lg:px-10">
            {initialLoading ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading profile…</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Input
                    value={email}
                    disabled
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-violet-500 focus:ring-violet-500 h-11"
                    disabled={loading}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 h-11 px-6"
                    onClick={() => router.back()}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all h-11 px-6"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


