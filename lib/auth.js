import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export const getUserIdFromToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.sub) {
      throw new Error("Unauthorized: Invalid token");
    }

    return decoded.sub;
  } catch (error) {
    throw new Error(`Unauthorized: ${error.message}`);
  }
};
