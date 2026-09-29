import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  console.log(cookieStore.get("jwt"));

  const token = cookieStore.get("jwt");

  if (token) redirect("/dashboard");
  redirect("/login");
}
