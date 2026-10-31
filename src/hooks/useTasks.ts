import {
  addComment,
  createTask,
  getTaskActivityLogs,
  softDeleteTask,
  updateTaskStatus,
} from "@/api";
import { IAddCommentPayload, IUpdateTaskStatusPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to create task");
    },
  });
}

export function useUpdateTaskStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: IUpdateTaskStatusPayload;
    }) => updateTaskStatus(taskId, payload),
    onSuccess: () => {
      toast.success("Task status updated!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to update status");
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => softDeleteTask(taskId),
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to delete task");
    },
  });
}

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: IAddCommentPayload;
    }) => addComment(taskId, payload),
    onSuccess: () => {
      toast.success("Comment added!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to add comment");
    },
  });
}

export function useTaskActivityLogsQuery(taskId: string) {
  return useQuery({
    queryKey: ["tasks", taskId, "activity-logs"],
    queryFn: () => getTaskActivityLogs(taskId),
    enabled: !!taskId,
  });
}