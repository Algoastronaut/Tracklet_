import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signToken, signRefreshToken } from "@/lib/jwt";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in ms

// Simple in-memory rate limiting (replace with Redis in production)
const loginAttempts = new Map();

const isAccountLocked = (email) => {
  const attempt = loginAttempts.get(email);
  if (!attempt) return false;
  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    if (Date.now() - attempt.lastAttempt < LOCKOUT_DURATION) {
      return true;
    }
    loginAttempts.delete(email);
  }
  return false;
};

const recordLoginAttempt = (email) => {
  const attempt = loginAttempts.get(email);
  if (!attempt) {
    loginAttempts.set(email, { count: 1, lastAttempt: Date.now() });
  } else {
    attempt.count += 1;
    attempt.lastAttempt = Date.now();
  }
};

const clearLoginAttempts = (email) => {
  loginAttempts.delete(email);
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check for account lockout
    if (isAccountLocked(email)) {
      return NextResponse.json(
        { error: "Account locked due to too many login attempts. Try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      recordLoginAttempt(email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      recordLoginAttempt(email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Clear login attempts on successful login
    clearLoginAttempts(email);

    // Generate tokens
    const accessToken = signToken({
      sub: user.id,
      email: user.email,
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
      email: user.email,
    });

    // Set cookies
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}
