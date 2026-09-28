"use client";

import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

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
import { loginAction } from "./authActions";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <Card className="border-border/80 w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-1.5 text-center">
        <div className="bg-primary/10 text-primary mx-auto mb-2 flex size-10 items-center justify-center rounded-full">
          <Lock className="size-5" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="text-destructive text-sm font-medium">{state.error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                required
                className="pl-9"
              />
              <User className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className={buttonVariants({
                  variant: "link",
                  className:
                    "text-muted-foreground hover:text-primary h-auto p-0 text-xs font-normal",
                })}
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pr-9 pl-9"
              />
              <Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
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

          <Button type="submit" className="mt-2 w-full gap-2" disabled={isPending}>
            <LogIn className="size-4" />
            {isPending ? "Signing in..." : "Submit"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-muted-foreground flex justify-center border-t py-4 text-center text-xs">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className={buttonVariants({
            variant: "link",
            className: "h-auto p-0 text-xs font-medium",
          })}
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
