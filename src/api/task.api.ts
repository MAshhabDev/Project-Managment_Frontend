import apiClient from "@/lib/apiClient";
import {
  IActivityLog,
  IAddCommentPayload,
  ApiResponse,
  IComment,
  ICreateTaskPayload,
  ITask,
  IUpdateTaskStatusPayload,
} from "@/types";

export function createTask(payload: ICreateTaskPayload) {
  return apiClient<ApiResponse<ITask>>("/tasks", {
    method: "POST",
    body: payload,
  });
}

export function updateTaskStatus(taskId: string, payload: IUpdateTaskStatusPayload) {
  return apiClient<ApiResponse<ITask>>(`/tasks/${taskId}/status`, {
    method: "PATCH",
    body: payload,
  });
}

export function softDeleteTask(taskId: string) {
  return apiClient<ApiResponse<ITask>>(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export function addComment(taskId: string, payload: IAddCommentPayload) {
  return apiClient<ApiResponse<IComment>>(`/tasks/${taskId}/comments`, {
    method: "POST",
    body: payload,
  });
}

export function getTaskActivityLogs(taskId: string) {
  return apiClient<ApiResponse<IActivityLog[]>>(`/tasks/${taskId}/activity-logs`);
}