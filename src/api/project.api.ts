import apiClient from "@/lib/apiClient";
import { ApiResponse, ICreateProjectPayload, IProject } from "@/types";

export function createProject(payload: ICreateProjectPayload) {
  return apiClient<ApiResponse<IProject>>("/projects", {
    method: "POST",
    body: payload,
  });
}

export function getAllProjects(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  organizationId?: string;
}) {
  return apiClient<ApiResponse<IProject[]>>("/projects", {
    query: params,
  });
}