import LoginForm from "@/features/auth/LoginForm";

export const metadata = {
  title: "Login | Team Task Management",
  description: "Enter your credentials to access your account",
};

export default function LoginPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen w-full items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
