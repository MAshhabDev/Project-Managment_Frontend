import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
  IUser,
  IVerifyEmailPayload,
} from "@/types";

export function loginUser(payload: ILoginPayload) {
  return apiClient<ApiResponse<{ accessToken: string; refreshToken: string }>>(
    "/auth/login",
    { method: "POST", body: payload }
  );
}

export function registerUser(payload: IRegisterPayload) {
  return apiClient<ApiResponse<null>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function verifyEmailOtp(payload: IVerifyEmailPayload) {
  return apiClient<ApiResponse<{ user: IUser; accessToken: string; refreshToken: string }>>(
    "/auth/verify-email",
    { method: "POST", body: payload }
  );
}

export async function getMe(): Promise<ApiResponse<IUser | null>> {
  try {
    return await apiClient<ApiResponse<IUser>>("/auth/me");
  } catch {
    // গেস্ট ভিজিটর লগইন না থাকলে এরর থ্রো না করে ক্লিনলি null রিটার্ন করবে
    return {
      statusCode: 200,
      success: true,
      message: "Unauthenticated guest",
      data: null,
    };
  }
}

export function googleLogin(payload: { idToken: string }) {
  return apiClient<ApiResponse<{ accessToken: string; refreshToken: string }>>(
    "/auth/google-login",
    { method: "POST", body: payload }
  );
}

export function forgotPassword(payload: IForgotPasswordPayload) {
  return apiClient<ApiResponse<null>>("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(payload: IResetPasswordPayload) {
  return apiClient<ApiResponse<null>>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}

export function refreshToken() {
  return apiClient<ApiResponse<{ accessToken: string }>>("/auth/refresh-token", {
    method: "POST",
  });
}
