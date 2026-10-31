"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation, useVerifyEmailMutation } from "@/hooks";
import { RegisterSchema } from "@/validation/auth.validation";
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
  XCircle,
  Loader2,
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
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const currentPassword = watch("password") || "";

  const passwordRules = [
    { label: "At least 6 characters", met: currentPassword.length >= 6 },
    { label: "One uppercase letter (A-Z)", met: /[A-Z]/.test(currentPassword) },
    { label: "One lowercase letter (a-z)", met: /[a-z]/.test(currentPassword) },
    { label: "One number (0-9)", met: /[0-9]/.test(currentPassword) },
    { label: "One special character (@$!%*?)", met: /[^A-Za-z0-9]/.test(currentPassword) },
  ];

  const onRegisterSubmit = (data: RegisterFormValues) => {
    setRegisteredEmail(data.email);
    registerMutation.mutate(data, {
      onSuccess: () => {
        setShowOtpModal(true);
      },
    });
  };

  const onOtpVerify = (e: React.FormEvent) => {
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 size-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        <Card className="shadow-2xl border-border/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <div className="flex justify-center mb-2">
              <div className="size-11 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                <KanbanSquare className="size-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription>
              Start managing projects with agile Kanban boards
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-9"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Work Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
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

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-9 pr-9"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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

              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 space-y-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  Password Requirements:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {passwordRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1.5 transition-colors ${
                        rule.met ? "text-emerald-500 font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {rule.met ? (
                        <CheckCircle2 className="size-3.5 shrink-0" />
                      ) : (
                        <XCircle className="size-3.5 shrink-0 text-muted-foreground/50" />
                      )}
                      <span className="text-[11px]">{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full font-semibold shadow-md shadow-primary/20"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-muted-foreground pt-1">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-2xl border-primary/30">
            <CardHeader className="text-center space-y-1 pb-3">
              <div className="size-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-1">
                <ShieldCheck className="size-6" />
              </div>
              <CardTitle className="text-xl font-bold">Verify Your Email</CardTitle>
              <CardDescription className="text-xs">
                We sent a 6-digit OTP code to{" "}
                <span className="font-semibold text-foreground">{registeredEmail}</span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={onOtpVerify} className="space-y-5">
                <div className="flex justify-center py-2">
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
                </div>

                <Button
                  type="submit"
                  disabled={otpValue.length !== 6 || verifyEmailMutation.isPending}
                  className="w-full font-semibold"
                >
                  {verifyEmailMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Complete Registration"
                  )}
                </Button>

                <p className="text-center text-[11px] text-muted-foreground">
                  Didn&apos;t receive the code? Check your spam folder or try again in 5 minutes.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}