import { createProject, getAllProjects } from "@/api";
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
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project created with Kanban Board successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      const msg = err.data?.message || err.message || "";
      if (msg.includes("Forbidden") || err.status === 403) {
        toast.error(
          "Permission Denied: Only the Organization Owner or Manager can create projects in this workspace.",
        );
      } else {
        toast.error(msg || "Failed to create project");
      }
    },
  });
}
