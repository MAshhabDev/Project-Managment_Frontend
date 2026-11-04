import apiClient from "@/lib/apiClient";
import { ApiResponse, ICreateProjectPayload, IProject } from "@/types";

export function createProject(payload: ICreateProjectPayload) {
  return apiClient<ApiResponse<IProject>>("/projects", {
    method: "POST",
    body: payload,
  });
}

export async function getAllProjects(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  organizationId?: string;
}): Promise<ApiResponse<IProject[]>> {
  const res = await apiClient<any>("/projects", {
    query: params,
  });

  // Handle both flat array and paginated { meta, data: [...] } responses from backend
  let list: IProject[] = [];
  if (Array.isArray(res?.data)) {
    list = res.data;
  } else if (Array.isArray(res?.data?.data)) {
    list = res.data.data;
  }

  return {
    ...res,
    data: list,
  };
}
