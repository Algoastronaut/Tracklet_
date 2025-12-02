import { NextResponse } from "next/server";
import { verifyRefreshToken, signToken } from "@/lib/jwt";

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Generate new access token
    const newAccessToken = signToken({
      sub: decoded.sub,
      email: decoded.email,
    });

    const response = NextResponse.json(
      {
        message: "Token refreshed successfully",
        token: newAccessToken,
      },
      { status: 200 }
    );

    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Token refresh error:", error.message);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 401 }
    );
  }
}
