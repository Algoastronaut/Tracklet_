"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleHashLink = (e, hash) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className={isHomePage ? "bg-slate-950 dark:bg-gray-950 border-t border-slate-800 dark:border-gray-800" : "bg-gradient-to-br from-gray-50 dark:from-gray-950 via-white dark:via-gray-900 to-violet-50/30 dark:to-violet-950/20 border-t border-gray-200/60 dark:border-gray-800 backdrop-blur-sm"}>
      <div className={`container mx-auto px-4 ${isHomePage ? "py-12" : "py-10"}`}>
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${isHomePage ? "mb-8" : "mb-8"}`}>
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
                Tracklet
              </span>
            </Link>
            {isHomePage && (
              <p className="text-sm text-slate-400 dark:text-gray-400 max-w-xs">
                Your intelligent finance companion. Track expenses, manage budgets, and take control of your financial future.
              </p>
            )}
          </div>

          {/* Product */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isHomePage ? "text-white dark:text-gray-100" : "text-gray-900 dark:text-gray-100"}`}>Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"}`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/transaction/create" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"}`}>
                  Add Transaction
                </Link>
              </li>
              {isHomePage && (
                <li>
                  <button
                    onClick={(e) => handleHashLink(e, "#features")}
                    className="text-sm text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400 transition-colors text-left"
                  >
                    Features
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isHomePage ? "text-white dark:text-gray-100" : "text-gray-900 dark:text-gray-100"}`}>Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"}`}>
                  Contact Us
                </Link>
              </li>
              {isHomePage && (
                <li>
                  <button
                    onClick={(e) => handleHashLink(e, "#testimonials")}
                    className="text-sm text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400 transition-colors text-left"
                  >
                    Testimonials
                  </button>
                </li>
              )}
              <li>
                <Link href="/" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"}`}>
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isHomePage ? "text-white dark:text-gray-100" : "text-gray-900 dark:text-gray-100"}`}>Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"}`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"}`}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"}`}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${isHomePage ? "border-slate-800 dark:border-gray-800" : "border-gray-200/60 dark:border-gray-800"} ${isHomePage ? "pt-8" : "pt-8"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${isHomePage ? "text-slate-500 dark:text-gray-400" : "text-gray-500 dark:text-gray-400 font-medium"}`}>
              © {currentYear} Tracklet. All rights reserved.
            </p>
            <a
              href="mailto:support@tracklet.com"
              className={`transition-all flex items-center gap-2 ${isHomePage ? "text-slate-400 dark:text-gray-400 hover:text-violet-400 dark:hover:text-violet-400" : "text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium"}`}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
              {!isHomePage && <span className="text-sm">support@tracklet.com</span>}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

