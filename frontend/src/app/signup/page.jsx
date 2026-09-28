import SignupForm from "@/features/auth/SignupForm";

export const metadata = {
  title: "Sign Up | Team Task Management",
  description: "Create an account to join your team",
};

export default function SignupPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen w-full items-center justify-center p-4">
      <SignupForm />
    </div>
  );
}
