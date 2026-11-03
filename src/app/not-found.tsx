"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KanbanSquare, ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground text-center animate-in fade-in duration-300">
      <div className="max-w-md w-full p-8 rounded-3xl border border-border/80 bg-card shadow-2xl space-y-6">
        <div className="relative mx-auto size-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-primary/10 animate-ping opacity-25" />
          <div className="size-16 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shadow-xs border border-primary/20">
            <Compass className="size-8" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black font-heading tracking-tight text-primary">
            404
          </span>
          <h1 className="text-xl font-bold font-heading text-foreground">
            Page Not Found
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The page you are looking for doesn&apos;t exist, has been removed, or the link you followed was incorrect.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-xl text-xs font-semibold gap-1.5 shadow-sm">
              <KanbanSquare className="size-3.5" />
              <span>Go to Workspace</span>
            </Button>
          </Link>

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