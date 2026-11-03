"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  useAdminDashboardStatsQuery,
  useGetMe,
  useToggleUserStatusMutation,
} from "@/hooks";
import { Role, UserStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  UserCheck,
  UserX,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function AdminUsersManagementPage() {
  const { data: meData } = useGetMe();
  const currentAdmin = meData?.data;

  const { data: statsData, isLoading } = useAdminDashboardStatsQuery();
  const users = statsData?.data?.recentUsers || [];

  const toggleUserStatusMutation = useToggleUserStatusMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "ALL" ? true : u.role === roleFilter;
      const matchesStatus =
        statusFilter === "ALL" ? true : u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleToggleStatus = (
    targetUserId: string,
    currentStatus: UserStatus,
  ) => {
    if (targetUserId === currentAdmin?.id) {
      alert(
        "Action Forbidden: You cannot ban your own active administrator account.",
      );
      return;
    }

    const nextStatus =
      currentStatus === UserStatus.ACTIVE
        ? UserStatus.BLOCKED
        : UserStatus.ACTIVE;

    const actionText = nextStatus === UserStatus.BLOCKED ? "BAN" : "UNBAN";

    if (
      confirm(
        `Are you sure you want to ${actionText} this user? ${
          nextStatus === UserStatus.BLOCKED
            ? "They will be immediately prevented from logging into the platform."
            : "Their platform access will be restored."
        }`,
      )
    ) {
      toggleUserStatusMutation.mutate({
        userId: targetUserId,
        status: nextStatus,
      });
    }
  };

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case Role.MANAGER:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Users className="size-4" />
            <span>Account Moderation</span>
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
            User Management & Access Control
          </h1>
          <p className="text-xs text-muted-foreground">
            Search, inspect, and moderate tenant accounts, privileges, and
            security status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-xs gap-1.5"
            >
              <ArrowLeft className="size-3.5" />
              Back to Overview
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/70 bg-card/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs rounded-xl"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground flex items-center gap-1 font-semibold text-xs mr-1">
            <Filter className="size-3.5" /> Filters:
          </span>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
          >
            <option value="ALL">All Roles</option>
            <option value={Role.ADMIN}>ADMIN</option>
            <option value={Role.MANAGER}>MANAGER</option>
            <option value={Role.MEMBER}>MEMBER</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-primary"
          >
            <option value="ALL">All Statuses</option>
            <option value={UserStatus.ACTIVE}>ACTIVE</option>
            <option value={UserStatus.BLOCKED}>BLOCKED</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-14 rounded-xl bg-muted/20 animate-pulse border border-border/30"
              />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Users className="size-10 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold text-foreground">
              No Users Found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No accounts match your search query or filter selection.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/60 bg-muted/30 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3.5 px-4">User Details</th>
                  <th className="py-3.5 px-4">Account Role</th>
                  <th className="py-3.5 px-4">Access Status</th>
                  <th className="py-3.5 px-4">Registered Date</th>
                  <th className="py-3.5 px-4 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredUsers.map((u) => {
                  const isSelf = u.id === currentAdmin?.id;
                  const isBlocked = u.status === UserStatus.BLOCKED;

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      {/* User Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {u.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isSelf && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-primary/20 text-primary uppercase">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-muted-foreground">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getRoleBadge(
                            u.role,
                          )}`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider inline-flex items-center gap-1 ${
                            isBlocked
                              ? "bg-red-500/10 text-red-600 border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          }`}
                        >
                          {isBlocked ? (
                            <>
                              <UserX className="size-3" />
                              <span>BLOCKED</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="size-3" />
                              <span>ACTIVE</span>
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-muted-foreground/60" />
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {isSelf ? (
                          <span className="text-[11px] text-muted-foreground italic">
                            Protected Account
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant={isBlocked ? "outline" : "destructive"}
                            onClick={() => handleToggleStatus(u.id, u.status)}
                            disabled={toggleUserStatusMutation.isPending}
                            className="rounded-xl text-xs gap-1.5 shadow-2xs"
                          >
                            {isBlocked ? (
                              <>
                                <UserCheck className="size-3.5 text-emerald-600" />
                                <span>Unban Account</span>
                              </>
                            ) : (
                              <>
                                <ShieldAlert className="size-3.5" />
                                <span>Ban Account</span>
                              </>
                            )}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
