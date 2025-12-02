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
    <footer className={isHomePage ? "bg-slate-950 border-t border-slate-800" : "bg-white/50 backdrop-blur-sm border-t border-gray-200"}>
      <div className={`container mx-auto px-4 ${isHomePage ? "py-12" : "py-8"}`}>
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${isHomePage ? "mb-8" : "mb-6"}`}>
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="Tracklet Logo"
                width={150}
                height={45}
                className="h-10 w-auto object-contain"
              />
            </Link>
            {isHomePage && (
              <p className="text-sm text-slate-400 max-w-xs">
                Your intelligent finance companion. Track expenses, manage budgets, and take control of your financial future.
              </p>
            )}
          </div>

          {/* Product */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isHomePage ? "text-white" : "text-gray-900"}`}>Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/transaction/create" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}>
                  Add Transaction
                </Link>
              </li>
              {isHomePage && (
                <li>
                  <button
                    onClick={(e) => handleHashLink(e, "#features")}
                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors text-left"
                  >
                    Features
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isHomePage ? "text-white" : "text-gray-900"}`}>Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}>
                  Contact Us
                </Link>
              </li>
              {isHomePage && (
                <li>
                  <button
                    onClick={(e) => handleHashLink(e, "#testimonials")}
                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors text-left"
                  >
                    Testimonials
                  </button>
                </li>
              )}
              <li>
                <Link href="/" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}>
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isHomePage ? "text-white" : "text-gray-900"}`}>Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className={`text-sm transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${isHomePage ? "border-slate-800" : "border-gray-200"} ${isHomePage ? "pt-8" : "pt-6"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${isHomePage ? "text-slate-500" : "text-gray-500"}`}>
              © {currentYear} Tracklet. All rights reserved.
            </p>
            <a
              href="mailto:support@tracklet.com"
              className={`transition-colors ${isHomePage ? "text-slate-400 hover:text-violet-400" : "text-gray-600 hover:text-violet-600"}`}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

