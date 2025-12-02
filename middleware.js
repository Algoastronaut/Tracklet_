import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const protectedRoutes = [
  "/dashboard",
  "/account",
  "/transaction",
];

const authRoutes = [
  "/sign-in",
  "/sign-up",
];

const isProtectedRoute = (pathname) => {
  return protectedRoutes.some(route => pathname.startsWith(route));
};

const isAuthRoute = (pathname) => {
  return authRoutes.some(route => pathname.startsWith(route));
};

// Create Arcjet middleware
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protection for content and security
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "GO_HTTP", // For Inngest
        // See the full list at https://arcjet.com/bot-list
      ],
    }),
  ],
});

// Create JWT middleware
export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  // Verify protected routes
  if (isProtectedRoute(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute(pathname) && token) {
    try {
      verifyToken(token);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      // Token invalid, allow access to auth routes
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
