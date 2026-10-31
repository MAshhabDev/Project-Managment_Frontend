import {
  forgotPassword,
  getMe,
  googleLogin,
  loginUser,
  refreshToken,
  registerUser,
  resetPassword,
  verifyEmailOtp,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useGetMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(res.message || "Logged in successfully!");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to login");
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(res.message || "Registration OTP sent to email!");
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Registration failed");
    },
  });
}

export function useVerifyEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmailOtp,
    onSuccess: (res) => {
      toast.success(res.message || "Email verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Verification failed");
    },
  });
}

export function useGoogleLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (res) => {
      toast.success("Google login successful!");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Google login failed");
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res) => {
      toast.success(res.message || "Password reset OTP sent to email!");
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to send OTP");
    },
  });
}

export function useResetPasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      toast.success(res.message || "Password reset successful! Please login.");
      router.push("/login");
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to reset password");
    },
  });
}