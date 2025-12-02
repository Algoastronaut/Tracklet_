import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log("/api/auth/me: tokenPresent=", !!token);

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token is valid by decoding it
    let decoded;
    
    try {
      decoded = verifyToken(token);
      console.log(`/api/auth/me: token decoded sub=${decoded.sub}`);
    } catch (error) {
      console.log("/api/auth/me: token verify error:", error.message);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        email: true,
        name: true,
        imageUrl: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Failed to get user" },
      { status: 500 }
    );
  }
}
