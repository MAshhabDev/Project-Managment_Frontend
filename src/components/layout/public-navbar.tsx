"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useGetMe } from "@/hooks";
import { Role } from "@/types";
import { Button } from "@/components/ui/button";
import {
  KanbanSquare,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: userData } = useGetMe();
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasToken(!!localStorage.getItem("accessToken"));
    }
  }, []);

  const user = hasToken ? userData?.data : null;

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
          <span className="font-heading font-black text-xl tracking-tight text-foreground">
            TaskFlow
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-muted-foreground">
          <Link href="/#features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#workflow" className="hover:text-foreground transition-colors">
            Kanban Board
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Right CTA Actions & Dark/Light Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="size-9 p-0 rounded-xl border-border/80 bg-background/80 hover:bg-muted transition-all"
            title="Toggle dark / light mode"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
          </Button>

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

        {/* Mobile Actions: Theme Toggle + Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="size-9 p-0 rounded-xl border-border/80 bg-background/80"
            title="Toggle dark / light mode"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
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
              Kanban Board
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
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
