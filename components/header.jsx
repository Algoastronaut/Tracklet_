"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Refetch user when route changes (e.g., after login redirect)
  useEffect(() => {
    fetchUser();
  }, [pathname]);

  // Listen for custom login event
  useEffect(() => {
    const handleLogin = () => {
      fetchUser();
    };

    window.addEventListener("user-logged-in", handleLogin);
    return () => window.removeEventListener("user-logged-in", handleLogin);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        setUser(null);
        router.push("/");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred");
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    return `${first}${second}`.toUpperCase() || first.toUpperCase();
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Tracklet Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          {!user && !pathname?.startsWith("/sign-in") && !pathname?.startsWith("/sign-up") && (
            <>
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600"
              >
                Testimonials
              </a>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline ml-2">Dashboard</span>
                </Button>
              </Link>
              <Link href="/transaction/create">
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 hover:bg-gray-50 rounded-full py-1 pr-2 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-semibold text-white shadow-sm">
                      {user?.name ? getInitials(user.name) : <User className="h-4 w-4" />}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-800">
                      {user?.name || "Your profile"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-xs">
                    Signed in as
                    <div className="text-xs font-medium text-foreground truncate">
                      {user?.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-sm"
                    onClick={() => router.push("/profile")}
                  >
                    <User className="mr-1.5 h-4 w-4" />
                    <span>Edit profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:bg-red-50 focus:text-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-1.5 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : !isLoading ? (
            <>
              <Link href="/contact">
                <Button variant="ghost" className="hidden sm:flex">
                  Contact Us
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
