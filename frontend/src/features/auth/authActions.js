"use server";

import { apiClient } from "@/lib/apiClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const { res, data } = await apiClient("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    // Since the Express backend sets an HttpOnly cookie via the 'set-cookie' header,
    // we need to manually pass it to the Next.js server so it can send it to the browser.
    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      // In a robust implementation, you might want to parse the cookie attributes properly.
      // For now, we'll manually set the cookie in Next.js using the parsed values or let Next.js pass it through.
      // Easiest is to manually extract the token (assuming cookie name is 'jwt').

      const cookieMatches = setCookieHeader.match(/jwt=([^;]+)/);
      if (cookieMatches) {
        cookies().set({
          name: "jwt",
          value: cookieMatches[1],
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7 days
        });
      }
    }

    // Cannot redirect inside try/catch block if we use next/navigation
    // so we return success and let the client handle redirection or we redirect outside the catch
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }

  redirect("/dashboard");
}

export async function signupAction(prevState, formData) {
  try {
    const fullName = formData.get("fullName");
    const userName = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // Server-side validation
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) return { error: "Passwords do not match." };

    const { res, data } = await apiClient("/auth/signup", {
      method: "POST",
      body: { fullName, userName, email, password },
    });

    // Set cookie just like in login
    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieMatches = setCookieHeader.match(/jwt=([^;]+)/);
      if (cookieMatches) {
        cookies().set({
          name: "jwt",
          value: cookieMatches[1],
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        });
      }
    }
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }

  redirect("/dashboard");
}
