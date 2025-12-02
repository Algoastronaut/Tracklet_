import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

// Helper to extract the current user's ID from the JWT stored in cookies.
// Note: `cookies()` is synchronous in Next.js app router – do NOT `await` it.
export const getUserIdFromToken = () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    console.log("getUserIdFromToken: tokenPresent=", !!token);

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const decoded = verifyToken(token);
    console.log("getUserIdFromToken: decoded=", decoded);

    if (!decoded || !decoded.sub) {
      throw new Error("Unauthorized: Invalid token");
    }

    return decoded.sub;
  } catch (error) {
    throw new Error(`Unauthorized: ${error.message}`);
  }
};
