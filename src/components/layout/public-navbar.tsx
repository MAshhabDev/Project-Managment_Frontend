"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetMe } from "@/hooks";
import { Role } from "@/types";
import { Button } from "@/components/ui/button";
import {
  KanbanSquare,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const getDashboardRoute = () => {
    if (!user) return "/dashboard";
    if (user.role === Role.ADMIN) return "/admin";
    if (user.role === Role.MANAGER) return "/manager";
    return "/dashboard";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <KanbanSquare className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-lg tracking-tight text-foreground flex items-center gap-1.5">
              TaskFlow <span className="text-primary text-xs font-bold px-1.5 py-0.2 rounded-md bg-primary/10 border border-primary/20">SaaS</span>
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-muted-foreground">
          <Link href="/#features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#workflow" className="hover:text-foreground transition-colors">
            Agile Kanban
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing & Plans
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href={getDashboardRoute()}>
              <Button size="sm" className="rounded-xl text-xs gap-1.5 shadow-sm">
                <span>Go to Dashboard</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-xl text-xs">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-xl text-xs gap-1 shadow-sm">
                  <span>Start Free Trial</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/70 bg-background/95 backdrop-blur-xl px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 text-sm font-semibold">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Agile Kanban
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing & Plans
            </Link>
          </nav>

          <div className="pt-3 border-t border-border/50 flex flex-col gap-2.5">
            {user ? (
              <Link href={getDashboardRoute()} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl text-xs gap-1.5 shadow-sm">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl text-xs">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl text-xs gap-1 shadow-sm">
                    <span>Start Free Trial</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}