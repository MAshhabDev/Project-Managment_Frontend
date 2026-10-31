"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResetPasswordMutation } from "@/hooks";
import { ResetPasswordSchema } from "@/validation/auth.validation";
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
import { Lock, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";

type ResetFormValues = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const resetMutation = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: ResetFormValues) => {
    resetMutation.mutate({
      email: emailParam,
      otp: data.otp,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <Card className="w-full max-w-md shadow-2xl border-border/80 backdrop-blur-xl">
        <CardHeader className="text-center space-y-1">
          <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-2">
            <ShieldCheck className="size-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            Enter the 6-digit OTP sent to <span className="font-semibold text-foreground">{emailParam}</span> and your new password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* OTP Input */}
            <div className="space-y-1.5 text-center">
              <Label className="text-xs">6-Digit Verification Code</Label>
              <div className="flex justify-center py-2">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(val) => {
                    setOtpValue(val);
                    setValue("otp", val);
                  }}
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
              {errors.otp && (
                <p className="text-xs text-destructive font-medium">
                  {errors.otp.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <Label htmlFor="newPassword" className="text-xs">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  className="pl-9 pr-9"
                  {...register("newPassword")}
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
              {errors.newPassword && (
                <p className="text-xs text-destructive font-medium">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={resetMutation.isPending || otpValue.length !== 6}
              className="w-full font-semibold shadow-md shadow-primary/20"
            >
              {resetMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Resetting password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>

          <div className="text-center pt-3 text-xs text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}