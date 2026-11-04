"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Role } from "@/types";
import { adminRoutes, managerRoutes, memberRoutes } from "@/routes";
import { KanbanSquare, Sparkles, Globe, CreditCard } from "lucide-react";

interface IDashboardSidebarProps {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({
  role,
  isOpen,
  onClose,
}: IDashboardSidebarProps) {
  const pathname = usePathname();

  const routes =
    role === Role.ADMIN
      ? adminRoutes
      : role === Role.MANAGER
        ? managerRoutes
        : memberRoutes;

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-border/70 bg-card/95 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Top Logo / Home Link */}
          <Link
            href="/"
            onClick={onClose}
            className="h-16 flex items-center gap-2.5 px-6 border-b border-border/70 hover:bg-muted/40 transition-colors group"
            title="Click to visit Home Page"
          >
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <KanbanSquare className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight flex items-center gap-1.5">
                TaskFlow
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/80">
                  Home
                </span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                {role} Workspace
              </span>
            </div>
          </Link>

          <nav className="p-4 space-y-6 overflow-y-auto">
            {routes.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 px-3">
                  {group.group}
                </span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.url;
                    return (
                      <Link
                        key={item.url}
                        href={item.url}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        }`}
                      >
                        <Icon
                          className={`size-4.5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border/70 space-y-2.5">
          <Link
            href="/"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-border/80 bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
          >
            <Globe className="size-3.5 text-primary" />
            <span>Go to Home Page</span>
          </Link>

          {/* Upgrade Plan link widget */}
          <Link
            href="/pricing"
            onClick={onClose}
            className="p-3 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all flex items-center justify-between gap-3 group"
            title="Click to view pricing & upgrade plan"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="size-4" />
              </div>
              <div className="overflow-hidden text-left">
                <p className="text-xs font-bold truncate">Upgrade Plan</p>
                <p className="text-[10px] text-muted-foreground truncate">
                  bKash Subscriptions
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 shrink-0">
              Plans
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
