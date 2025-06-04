"use server";

import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const ActionSignIn = async (
  params: Pick<IAuthCridetials, "email" | "password">
): Promise<{ success: boolean; error?: string; message: string }> => {
  const { email, password } = params;

  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (!res.ok) {
      console.log(res.status);
      return {
        success: false,
        message: res.statusText,
      };
    }
    return {
      success: true,
      message: "Login successfull!",
    };
  } catch (err) {
    console.error("Unexpected error during sign in:", err);
    return {
      success: false,
      message: "Unexpected server error",
    };
  }
};

export const ActionSignUp = async (
  params: IAuthCridetials
): Promise<{ success: boolean; error?: string; message: string }> => {
  const { name, email, password } = params;

  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      error: "User already exists",
      message: "User already exists",
    };
  }

  try {
    const res = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });

    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
      };
    }

    return {
      success: true,
      message: "Sign Up successfull!",
    };
  } catch (err) {
    console.error("Unexpected error during sign un:", err);
    return {
      success: false,
      message: "Unexpected server error",
    };
  }
};
