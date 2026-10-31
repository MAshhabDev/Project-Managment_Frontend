import { Role } from "./auth.type";

export interface IOrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: Role;
  joinedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
    role?: Role;
  };
}

export interface IOrganization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
  };
  members?: IOrganizationMember[];
}

export interface ICreateOrganizationPayload {
  name: string;
}

export interface IInviteMemberPayload {
  email: string;
  role?: Role;
}

export interface ITeamMember {
  id: string;
  teamId: string;
  userId: string;
  joinedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
  };
}

export interface ITeam {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  members?: ITeamMember[];
}

export interface ICreateTeamPayload {
  organizationId: string;
  name: string;
  description?: string;
}

export interface IAddTeamMemberPayload {
  userId: string;
}