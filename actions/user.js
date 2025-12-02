"use server";

import { db } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(data) {
  const { name } = data;

  if (!name || !name.trim()) {
    throw new Error("Name is required");
  }

  const userId = await getUserIdFromToken();

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      name: name.trim(),
    },
    select: {
      id: true,
      email: true,
      name: true,
      imageUrl: true,
    },
  });

  // Refresh places that show the user name (header, dashboard, etc.)
  revalidatePath("/dashboard");
  revalidatePath("/");

  return {
    success: true,
    data: updatedUser,
  };
}


