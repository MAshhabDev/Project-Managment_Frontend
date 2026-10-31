"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/hooks";
import { LoginSchema } from "@/validation/auth.validation";
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
  Crown,
  Briefcase,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Loader2,
  KanbanSquare,
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

  // ফর্ম সাবমিশন
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // ড্যাশবোর্ডে রিডাইরেক্ট
        router.push("/dashboard");
      },
    });
  };

  // 🌟 ১-ক্লিক ডেমো লগইন হ্যান্ডলার (Mandatory Assignment Requirement)
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
        {/* বাম পাশ: SaaS ফিচার শোকেস ও ব্র্যান্ডিং */}
        <div className="hidden lg:flex flex-col justify-between p-8 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5" />
              <span>Project Management SaaS v2.0</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                <KanbanSquare className="size-6" />
              </div>
              <span className="text-3xl font-bold font-heading tracking-tight">
                PulseFlow
              </span>
            </div>

            <h1 className="text-4xl font-extrabold font-heading tracking-tight leading-tight">
              Ship projects faster with agile Kanban workflows.
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Empower your teams with real-time task tracking, role-based
              collaboration, and automated bKash subscription billing.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              "Interactive Drag-and-Drop Kanban Boards",
              "Granular 3-Tier Roles: Admin, Manager & Member",
              "Automated Team Activity Logs & Comments",
              "Integrated bKash Payment Gateway",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md">
            <p className="text-xs text-muted-foreground leading-relaxed">
              &quot;PulseFlow transformed our sprint delivery speed by 40%. The
              cleanest Kanban dashboard we have ever used.&quot;
            </p>
            <p className="text-xs font-semibold mt-2 text-foreground">
              — Product Lead @ AgileTech
            </p>
          </div>
        </div>

        {/* ডান পাশ: কার্ড লগইন ফর্ম */}
        <Card className="w-full shadow-2xl border-border/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <div className="lg:hidden flex items-center gap-1.5 font-bold font-heading text-primary">
                <KanbanSquare className="size-5" />
                <span>PulseFlow</span>
              </div>
            </div>
            <CardDescription>
              Enter your credentials or use 1-click demo login below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 🌟 ১-ক্লিক ডেমো লগইন বাটন গ্রুপ (Mandatory Requirement) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Sparkles className="size-3 text-primary" /> Quick Demo Access
                </span>
                <span className="text-[10px] text-muted-foreground/80 bg-muted px-2 py-0.5 rounded-full">
                  1-Click Instant Login
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Admin Demo Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loginMutation.isPending}
                  onClick={() =>
                    handleDemoLogin("admin@gmail.com", "admin@12345", "/admin")
                  }
                  className="flex flex-col items-center justify-center h-auto py-2.5 px-2 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                >
                  <Crown className="size-4 text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Admin</span>
                  <span className="text-[10px] text-muted-foreground">Super</span>
                </Button>

                {/* Manager Demo Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loginMutation.isPending}
                  onClick={() =>
                    handleDemoLogin("manager@gmail.com", "manager@12345", "/manager")
                  }
                  className="flex flex-col items-center justify-center h-auto py-2.5 px-2 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                >
                  <Briefcase className="size-4 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Manager</span>
                  <span className="text-[10px] text-muted-foreground">Lead</span>
                </Button>

                {/* Member Demo Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loginMutation.isPending}
                  onClick={() =>
                    handleDemoLogin("member@gmail.com", "member@12345", "/dashboard")
                  }
                  className="flex flex-col items-center justify-center h-auto py-2.5 px-2 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                >
                  <User className="size-4 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Member</span>
                  <span className="text-[10px] text-muted-foreground">User</span>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/80" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-card px-2 text-muted-foreground tracking-wider font-semibold">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* ইমেইল ও পাসওয়ার্ড ফর্ম */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-9"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 pr-9"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full font-semibold shadow-md shadow-primary/20"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer Sign up link */}
            <div className="text-center text-xs text-muted-foreground pt-1">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline"
              >
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}