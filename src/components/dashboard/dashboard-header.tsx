"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { IUser, Role } from "@/types";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, LogOut, User, Globe, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface IDashboardHeaderProps {
  user?: IUser | null;
  onMenuToggle: () => void;
}

export function DashboardHeader({ user, onMenuToggle }: IDashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const roleBadgeColor =
    user?.role === Role.ADMIN
      ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
      : user?.role === Role.MANAGER
        ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
        : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";

  return (
    <header className="h-16 border-b border-border/70 bg-card/60 backdrop-blur-xl sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onMenuToggle}
          className="lg:hidden p-2"
        >
          <Menu className="size-5" />
        </Button>
        <span className="text-sm font-semibold text-muted-foreground hidden sm:inline">
          Dashboard / {user?.role || "Workspace"}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Upgrade Plan Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-xs font-semibold text-primary transition-all shadow-xs"
          title="View Pricing & Upgrade Plan"
        >
          <CreditCard className="size-3.5" />
          <span className="hidden sm:inline">Upgrade Plan</span>
        </Link>

        {/* Back to Home Page link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/80 bg-background/80 hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground transition-all shadow-xs"
          title="Go back to Home Page"
        >
          <Globe className="size-3.5 text-primary" />
          <span className="hidden sm:inline">Home Page</span>
        </Link>

        {/* Dark/Light mode theme toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="size-9 p-0 rounded-xl"
          title="Toggle color theme"
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* User Identity pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border/60">
          <div className="size-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs border border-primary/20">
            {user?.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <User className="size-4" />
            )}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold leading-none">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              {user?.email}
            </span>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider hidden sm:inline ${roleBadgeColor}`}
          >
            {user?.role}
          </span>
        </div>

        {/* Logout action */}
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="size-8 p-0 rounded-xl text-xs hover:bg-destructive/90"
          title="Sign out"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
