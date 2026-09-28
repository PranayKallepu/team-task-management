"use client";

import { AlertCircle, Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupAction } from "./authActions";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signupAction, null);

  return (
    <Card className="border-border/80 w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-1.5 text-center">
        <div className="bg-primary/10 text-primary mx-auto mb-2 flex size-10 items-center justify-center rounded-full">
          <UserPlus className="size-5" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Sign Up</CardTitle>
        <CardDescription>Create an account to join or create your team</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="signup-fullname">Full Name</Label>
            <div className="relative">
              <User className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="signup-fullname"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-username">Username</Label>
            <div className="relative">
              <Input
                id="signup-username"
                name="username"
                type="text"
                placeholder="Choose a username"
                required
                className="pl-9"
              />
              <User className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <div className="relative">
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="pl-9"
              />
              <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                minLength={6}
                className="pr-9 pl-9"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <div className="relative">
              <Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                minLength={6}
                className="pr-9 pl-9"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 -translate-y-1/2"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="mt-2 w-full gap-2" disabled={isPending}>
            <UserPlus className="size-4" />
            {isPending ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-muted-foreground flex justify-center border-t py-4 text-center text-xs">
        Already have an account?{" "}
        <Link
          href="/login"
          className={buttonVariants({
            variant: "link",
            className: "h-auto p-0 text-xs font-medium",
          })}
        >
          Log in
        </Link>
      </CardFooter>
    </Card>
  );
}
