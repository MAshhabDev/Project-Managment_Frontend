"use client";

import { useGetMe } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserCircle,
  Mail,
  ShieldCheck,
  Calendar,
  KeyRound,
  Sparkles,
  BadgeCheck,
  Clock,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function MemberProfilePage() {
  const { data: userData, isLoading } = useGetMe();
  const user = userData?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-2xl bg-muted/40 border border-border/40" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 rounded-2xl bg-muted/30 border border-border/40" />
          <div className="md:col-span-2 h-64 rounded-2xl bg-muted/30 border border-border/40" />
        </div>
      </div>
    );
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) || "U";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <UserCircle className="size-4" />
            <span>Account Management</span>
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
            My Profile & Preferences
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage your personal workspace profile, authentication credentials,
            and account details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold">
            <BadgeCheck className="size-3.5" />
            Account Verified
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/70 shadow-xs flex flex-col items-center text-center p-6 space-y-4">
          <div className="relative">
            <div className="size-24 rounded-full bg-gradient-to-tr from-primary to-primary/40 text-primary-foreground flex items-center justify-center text-2xl font-black shadow-md border-2 border-background">
              {initials}
            </div>
            <div className="absolute bottom-0 right-0 size-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center text-white">
              <BadgeCheck className="size-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold font-heading text-foreground">
              {user?.name || "Workspace Member"}
            </h2>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              {user?.role || "MEMBER"}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border uppercase tracking-wider">
              {user?.status || "ACTIVE"}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-border/60 text-xs text-muted-foreground space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-primary" /> Member Since
              </span>
              <span className="font-medium text-foreground">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-primary" /> Auth Provider
              </span>
              <span className="font-medium text-foreground uppercase text-[11px]">
                {user?.authProvider || "CREDENTIAL"}
              </span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/70 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold font-heading flex items-center gap-2">
                <UserCircle className="size-4 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-xs">
                Your registered identity across your assigned teams and
                organizations.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Full Name</Label>
                  <Input
                    value={user?.name || ""}
                    disabled
                    className="h-9 text-xs rounded-xl bg-muted/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Email Address</Label>
                  <Input
                    value={user?.email || ""}
                    disabled
                    className="h-9 text-xs rounded-xl bg-muted/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Account Role</Label>
                  <Input
                    value={user?.role || "MEMBER"}
                    disabled
                    className="h-9 text-xs rounded-xl bg-muted/30 uppercase font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    Unique User ID
                  </Label>
                  <Input
                    value={user?.id || ""}
                    disabled
                    className="h-9 text-xs rounded-xl bg-muted/30 font-mono text-[11px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Password Card */}
          <Card className="border-border/70 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold font-heading flex items-center gap-2">
                <Lock className="size-4 text-primary" />
                Security & Authentication
              </CardTitle>
              <CardDescription className="text-xs">
                Protect your account with encrypted authentication tokens and
                password recovery.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <KeyRound className="size-3.5 text-primary" />
                    Account Password
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Your password is protected by secure cryptographic hash
                    functions.
                  </p>
                </div>

                <Link href="/forgot-password">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs shrink-0"
                  >
                    Reset Password
                  </Button>
                </Link>
              </div>

              <div className="p-3.5 rounded-xl border border-border/50 bg-card flex items-center gap-3 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                <span>
                  Multi-session refresh tokens with HTTP-only cookies protect
                  your workspace against unauthorized tampering.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
