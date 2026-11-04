"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useRegisterMutation, useVerifyEmailMutation } from "@/hooks";
import { RegisterSchema } from "@/validation/auth.validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  KanbanSquare,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const registerMutation = useRegisterMutation();
  const verifyEmailMutation = useVerifyEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        setRegisteredEmail(data.email);
        setShowOtpModal(true);
      },
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6) return;

    verifyEmailMutation.mutate(
      { email: registeredEmail, otp: otpValue },
      {
        onSuccess: () => {
          setShowOtpModal(false);
          router.push("/dashboard");
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
            Create your account
          </h1>
          <p className="text-xs text-muted-foreground">
            Get started with agile Kanban boards and sprint tracking in seconds.
          </p>
        </div>

        {/* Classy Card Container */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-2xl shadow-xl space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  {...register("name")}
                  className="pl-10 h-10 text-xs rounded-xl bg-background/50 border-border/70 focus:border-primary"
                />
              </div>
              {errors.name && (
                <p className="text-[11px] text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="name@company.com"
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

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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
              disabled={registerMutation.isPending}
              className="w-full h-10 rounded-xl text-xs font-semibold shadow-md shadow-primary/20 gap-1.5 transition-all mt-2"
            >
              <span>
                {registerMutation.isPending ? "Creating account..." : "Create Account"}
              </span>
              <ArrowRight className="size-3.5" />
            </Button>
          </form>

          {/* Privacy Note */}
          <div className="pt-2 text-center text-[11px] text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>

      {/* Classy 6-Digit Email OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setShowOtpModal(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="size-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-foreground pt-1">
                  Verify your email
                </h3>
                <p className="text-xs text-muted-foreground">
                  We sent a 6-digit verification code to{" "}
                  <strong className="text-foreground">{registeredEmail}</strong>.
                </p>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-2">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(val) => setOtpValue(val)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-[11px] text-muted-foreground pt-1">
                  Check your inbox (or console in development).
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOtpModal(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    otpValue.length !== 6 || verifyEmailMutation.isPending
                  }
                  className="rounded-xl text-xs font-semibold px-5"
                >
                  {verifyEmailMutation.isPending
                    ? "Verifying..."
                    : "Confirm & Enter"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
