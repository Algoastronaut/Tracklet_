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
    <div className="px-5 py-6 lg:py-10 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-900 min-h-[calc(100vh-80px)]">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-title">
            Profile
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-md">
            Update how your name appears across Tracklet. Your email is used
            for login and notifications.
          </p>
        </div>

        <Card className="border-slate-800/80 bg-slate-950/80 text-slate-50 shadow-[0_18px_40px_rgba(15,23,42,0.9)]">
          <CardHeader>
            <CardTitle className="text-base">Account details</CardTitle>
          </CardHeader>
          <CardContent>
            {initialLoading ? (
              <p className="text-sm text-slate-400">Loading profile…</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Email
                  </label>
                  <Input
                    value={email}
                    disabled
                    className="bg-slate-900/60 border-slate-700 text-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-slate-900/60 border-slate-700 text-slate-50"
                    disabled={loading}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-500 text-slate-100 hover:bg-slate-900"
                    onClick={() => router.back()}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-500"
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


