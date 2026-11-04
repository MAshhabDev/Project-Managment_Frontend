import { createProject, getAllProjects, refreshToken } from "@/api";
import { ICreateProjectPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProjectsQuery(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  organizationId?: string;
}) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getAllProjects(params),
  });
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateProjectPayload) => {
      try {
        return await createProject(payload);
      } catch (err: any) {
        // If 403, try refreshing the token once (in case role was upgraded in DB but JWT is old)
        if (err?.status === 403 || err?.data?.message?.includes("Forbidden")) {
          try {
            const refreshRes = await refreshToken();
            if (typeof window !== "undefined" && refreshRes.data?.accessToken) {
              localStorage.setItem("accessToken", refreshRes.data.accessToken);
              document.cookie = `accessToken=${refreshRes.data.accessToken}; path=/; max-age=86400; SameSite=Lax`;
              // Retry with fresh manager token!
              return await createProject(payload);
            }
          } catch {
            // Re-throw original error if refresh fails
          }
        }
        throw err;
      }
    },
    onSuccess: () => {
      toast.success("Project created with Kanban Board successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      const msg = err.data?.message || err.message || "";
      if (msg.includes("Forbidden") || err.status === 403) {
        toast.error(
          "Permission Denied: Your active token has not reloaded. Please Log Out and Log In again to activate your Manager permissions!",
        );
      } else {
        toast.error(msg || "Failed to create project");
      }
    },
  });
}
