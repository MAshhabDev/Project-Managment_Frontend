"use client";

import Link from "next/link";
import { useAdminDashboardStatsQuery, useGetMe } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  ShieldCheck,
  Users,
  Building2,
  FolderKanban,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Activity,
  CreditCard,
  UserCheck,
  UserX,
  Lock,
} from "lucide-react";

export default function AdminOverviewPage() {
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const { data: statsData, isLoading } = useAdminDashboardStatsQuery();
  const stats = statsData?.data;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "MANAGER":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "BLOCKED":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-purple-500/10 via-primary/5 to-transparent p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Shield className="size-3.5" />
              <span>Platform Root Administration</span>
            </div>
            <h1 className="text-3xl font-black font-heading tracking-tight text-foreground">
              System Control Center, {user?.name || "Administrator"} 🛡️
            </h1>
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              Global system monitoring, tenant organization oversight, user
              access moderation, and SaaS subscription audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin/users">
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl text-xs gap-1.5"
              >
                <Users className="size-3.5" />
                Moderate Users
              </Button>
            </Link>

            <Link href="/admin/payments">
              <Button
                size="sm"
                className="rounded-xl text-xs gap-1.5 shadow-sm"
              >
                <CreditCard className="size-3.5" />
                Payment Records
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Users
            </CardTitle>
            <div className="size-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {isLoading ? "..." : stats?.totalUsers || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Registered platform accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Organizations
            </CardTitle>
            <div className="size-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Building2 className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {isLoading ? "..." : stats?.totalOrganizations || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Tenant workspaces created
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Active Projects
            </CardTitle>
            <div className="size-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FolderKanban className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {isLoading ? "..." : stats?.totalProjects || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Sprint boards initialized
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Sprint Tasks
            </CardTitle>
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckSquare className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black font-heading text-foreground">
              {isLoading ? "..." : stats?.totalTasks || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Across all Kanban boards
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">
                Recent User Registrations
              </h2>
              <p className="text-xs text-muted-foreground">
                Latest member and manager accounts onboarded to the system.
              </p>
            </div>
            <Link href="/admin/users">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary gap-1"
              >
                View all <ArrowRight className="size-3" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-20 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"
                />
              ))}
            </div>
          ) : !stats?.recentUsers || stats.recentUsers.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-border/70 bg-card/40 space-y-2">
              <Users className="size-8 text-muted-foreground mx-auto" />
              <h4 className="text-sm font-bold text-foreground">
                No Users Registered
              </h4>
              <p className="text-xs text-muted-foreground">
                New accounts will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentUsers.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {u.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-heading text-foreground">
                        {u.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getRoleBadge(
                        u.role,
                      )}`}
                    >
                      {u.role}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(
                        u.status,
                      )}`}
                    >
                      {u.status}
                    </span>

                    <span className="text-[10px] text-muted-foreground pl-1">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold font-heading text-foreground">
              Security & Environment
            </h2>
            <p className="text-xs text-muted-foreground">
              System infrastructure status.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="size-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-foreground">
                  Role-Based Access (RBAC)
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Strict client & server route guards active across Admin,
                  Manager, and Member layers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-border/50">
              <div className="size-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <Lock className="size-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-foreground">
                  Token Security
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Bcrypt hash with HTTP-only refresh cookies prevents XSS token
                  theft.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-border/50">
              <div className="size-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                <Activity className="size-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-foreground">
                  Database Health
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  PostgreSQL Prisma ORM transactions with automated cascade
                  safety.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/admin/users">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl text-xs gap-1.5"
                >
                  <span>Open User Moderation</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
