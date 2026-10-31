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

export function getMe() {
  return apiClient<ApiResponse<IUser>>("/auth/me");
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