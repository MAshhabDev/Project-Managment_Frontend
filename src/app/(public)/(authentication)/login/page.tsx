"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useLoginMutation } from "@/hooks";
import { LoginSchema } from "@/validation/auth.validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  KanbanSquare,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Briefcase,
  User,
  Zap,
} from "lucide-react";

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  const handleDemoLogin = (email: string, pass: string, targetPath: string) => {
    setValue("email", email);
    setValue("password", pass);
    loginMutation.mutate(
      { email, password: pass },
      {
        onSuccess: () => {
          router.push(targetPath);
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-background relative overflow-hidden antialiased">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-primary/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px] space-y-6 relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground flex items-center justify-center shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
              <KanbanSquare className="size-5" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tight text-foreground">
              TaskFlow
            </span>
          </Link>
          <h1 className="text-xl font-bold font-heading text-foreground pt-1">
            Sign in to your account
          </h1>
          <p className="text-xs text-muted-foreground">
            Welcome back! Choose a 1-click demo role or enter your credentials.
          </p>
        </div>

        {/* Classy Card Container */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-2xl shadow-xl space-y-6">
          {/* 1-Click Fast Pass Demo Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
              <span className="flex items-center gap-1 text-primary">
                <Zap className="size-3 text-amber-500" />
                1-Click Demo Fast-Pass
              </span>
              <span className="text-[10px] text-muted-foreground/80">Click to enter</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Admin Demo Button */}
              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("admin@gmail.com", "admin@12345", "/admin")
                }
                disabled={loginMutation.isPending}
                className="p-2.5 rounded-2xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/15 hover:border-purple-500/50 text-left transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Shield className="size-3.5" />
                  <span className="text-[11px] font-bold">Admin</span>
                </div>
                <p className="text-[9px] text-muted-foreground mt-0.5 truncate">
                  Full KPIs & Audit
                </p>
              </button>

              {/* Manager Demo Button */}
              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("manager@gmail.com", "manager@12345", "/manager")
                }
                disabled={loginMutation.isPending}
                className="p-2.5 rounded-2xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-500/50 text-left transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Briefcase className="size-3.5" />
                  <span className="text-[11px] font-bold">Manager</span>
                </div>
                <p className="text-[9px] text-muted-foreground mt-0.5 truncate">
                  Orgs & Squads
                </p>
              </button>

              {/* Member Demo Button */}
              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("member@gmail.com", "member@12345", "/dashboard")
                }
                disabled={loginMutation.isPending}
                className="p-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15 hover:border-emerald-500/50 text-left transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <User className="size-3.5" />
                  <span className="text-[11px] font-bold">Member</span>
                </div>
                <p className="text-[9px] text-muted-foreground mt-0.5 truncate">
                  Sprint Kanban
                </p>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-border/60" />
            <span className="absolute bg-card px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              or continue with email
            </span>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="pl-10 h-10 text-xs rounded-xl bg-background/50 border-border/70 focus:border-primary"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="pl-10 pr-10 h-10 text-xs rounded-xl bg-background/50 border-border/70 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-10 rounded-xl text-xs font-semibold shadow-md shadow-primary/20 gap-1.5 transition-all"
            >
              <span>{loginMutation.isPending ? "Signing in..." : "Sign In"}</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline"
          >
            Create an account for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
