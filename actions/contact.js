"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(data) {
  try {
    const contact = await db.contact.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    revalidatePath("/contact");
    return { success: true, data: contact };
  } catch (error) {
    throw new Error(error.message || "Failed to submit contact form");
  }
}

