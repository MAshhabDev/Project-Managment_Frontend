"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home, ShieldAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground text-center animate-in fade-in duration-300">
      <div className="max-w-md w-full p-8 rounded-3xl border border-border/80 bg-card shadow-2xl space-y-6">
        <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto border-2 border-destructive/20">
          <AlertCircle className="size-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 uppercase tracking-wider">
            System Exception
          </span>
          <h1 className="text-2xl font-black font-heading text-foreground">
            Something Went Wrong
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            An unexpected error occurred while executing this operation. You can retry the action or return to the main dashboard.
          </p>
        </div>

        {error.message && (
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-[11px] font-mono text-muted-foreground break-all text-left max-h-24 overflow-y-auto">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto rounded-xl text-xs font-semibold gap-1.5 shadow-sm"
          >
            <RotateCcw className="size-3.5" />
            <span>Try Again</span>
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-xl text-xs font-semibold gap-1.5"
            >
              <Home className="size-3.5" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}