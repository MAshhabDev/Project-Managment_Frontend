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

function getErrorMessage(err: any, defaultMsg: string): string {
  if (err?.message?.includes("Failed to fetch") || err?.name === "TypeError") {
    return "Cannot reach backend server. Please verify network or API status.";
  }
  return err?.data?.message || err?.message || defaultMsg;
}

function storeTokens(accessToken?: string, refreshToken?: string) {
  if (typeof window !== "undefined") {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Lax`;
    }
  }
}

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

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      storeTokens(res.data?.accessToken, res.data?.refreshToken);
      toast.success(res.message || "Logged in successfully!");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      queryClient.refetchQueries({ queryKey: ["auth", "me"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err, "Failed to login"));
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
      toast.error(getErrorMessage(err, "Registration failed"));
    },
  });
}

export function useVerifyEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmailOtp,
    onSuccess: (res) => {
      storeTokens(res.data?.accessToken, res.data?.refreshToken);
      toast.success(res.message || "Email verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      queryClient.refetchQueries({ queryKey: ["auth", "me"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err, "Verification failed"));
    },
  });
}

export function useGoogleLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (res) => {
      storeTokens(res.data?.accessToken, res.data?.refreshToken);
      toast.success("Google login successful!");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      queryClient.refetchQueries({ queryKey: ["auth", "me"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err, "Google login failed"));
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
      toast.error(getErrorMessage(err, "Failed to send OTP"));
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
      toast.error(getErrorMessage(err, "Failed to reset password"));
    },
  });
}
