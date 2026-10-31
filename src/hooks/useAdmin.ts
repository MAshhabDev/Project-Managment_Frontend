import { getAdminDashboardStats, toggleUserStatus } from "@/api";
import { UserStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminDashboardStatsQuery() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: getAdminDashboardStats,
  });
}

export function useToggleUserStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: UserStatus;
    }) => toggleUserStatus(userId, status),
    onSuccess: () => {
      toast.success("User status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to update user status");
    },
  });
}