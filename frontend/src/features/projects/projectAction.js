"use server";

import { apiClient } from "@/lib/apiClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createProjectAction(prevState, formData) {
  let data;

  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const cookieStore = await cookies();

    data = await apiClient("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: { name, description },
    });
  } catch (error) {
    console.log(error.message);
    return { error: error.message || "An unexpected error occurred" };
  }
  if (data.data.status !== "success") {
    return {
      error: data.message || "Failed to create project",
    };
  }
  redirect(`/projects/${data.data.data.project.slug}/overview`);
}
