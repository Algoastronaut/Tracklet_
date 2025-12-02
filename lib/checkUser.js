import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded || !decoded.sub) {
      return null;
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: {
        id: decoded.sub,
      },
    });

    return user || null;
  } catch (error) {
    console.error("checkUser error:", error.message);
    return null;
  }
};

export const getServerUser = async () => {
  return await checkUser();
};
