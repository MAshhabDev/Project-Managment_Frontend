import {
  addTeamMember,
  createOrganization,
  createTeam,
  getMyOrganizations,
  getOrganizationById,
  inviteMember,
} from "@/api";
import { IAddTeamMemberPayload, IInviteMemberPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMyOrganizationsQuery() {
  return useQuery({
    queryKey: ["organizations", "my"],
    queryFn: getMyOrganizations,
  });
}

export function useOrganizationQuery(id: string) {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById(id),
    enabled: !!id,
  });
}

export function useCreateOrgMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      toast.success("Organization created successfully!");
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to create organization");
    },
  });
}

export function useInviteMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orgId,
      payload,
    }: {
      orgId: string;
      payload: IInviteMemberPayload;
    }) => inviteMember(orgId, payload),
    onSuccess: () => {
      toast.success("Member invited successfully!");
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to invite member");
    },
  });
}

export function useCreateTeamMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      toast.success("Team created successfully!");
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to create team");
    },
  });
}

export function useAddTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      teamId,
      payload,
    }: {
      teamId: string;
      payload: IAddTeamMemberPayload;
    }) => addTeamMember(teamId, payload),
    onSuccess: () => {
      toast.success("Member added to team!");
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (err: any) => {
      toast.error(err.data?.message || err.message || "Failed to add member");
    },
  });
}