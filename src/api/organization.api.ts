import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  IAddTeamMemberPayload,
  ICreateOrganizationPayload,
  ICreateTeamPayload,
  IInviteMemberPayload,
  IOrganization,
  IOrganizationMember,
  ITeam,
  ITeamMember,
} from "@/types";

// Organizations
export function createOrganization(payload: ICreateOrganizationPayload) {
  return apiClient<ApiResponse<IOrganization>>("/organizations", {
    method: "POST",
    body: payload,
  });
}

export function getMyOrganizations() {
  return apiClient<ApiResponse<IOrganization[]>>("/organizations");
}

export function getOrganizationById(id: string) {
  return apiClient<ApiResponse<IOrganization>>(`/organizations/${id}`);
}

export function inviteMember(orgId: string, payload: IInviteMemberPayload) {
  return apiClient<ApiResponse<IOrganizationMember>>(
    `/organizations/${orgId}/invite`,
    { method: "POST", body: payload }
  );
}

// Teams
export function createTeam(payload: ICreateTeamPayload) {
  return apiClient<ApiResponse<ITeam>>("/teams", {
    method: "POST",
    body: payload,
  });
}

export function addTeamMember(teamId: string, payload: IAddTeamMemberPayload) {
  return apiClient<ApiResponse<ITeamMember>>(`/teams/${teamId}/members`, {
    method: "POST",
    body: payload,
  });
}

export function getTeamById(teamId: string) {
  return apiClient<ApiResponse<ITeam>>(`/teams/${teamId}`);
}