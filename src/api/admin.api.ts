import apiClient from "@/lib/apiClient";
import { ApiResponse, IAdminDashboardStats, IUser, UserStatus } from "@/types";

export function getAdminDashboardStats() {
  return apiClient<ApiResponse<IAdminDashboardStats>>("/admin/dashboard-stats");
}

export function toggleUserStatus(userId: string, status: UserStatus) {
  return apiClient<ApiResponse<IUser>>(`/admin/users/${userId}/ban`, {
    method: "PATCH",
    body: { status },
  });
}