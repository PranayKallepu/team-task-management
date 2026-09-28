"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ className = "" }) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={() => router.back()}
      className={`gap-2 font-medium ${className}`}
    >
      <ArrowLeft className="size-4" />
      Go Back
    </Button>
  );
}
