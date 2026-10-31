import { Role, UserStatus } from "./auth.type";

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface IPayment {
  id: string;
  organizationId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  organization?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface IBkashInitiatePayload {
  organizationId: string;
  amount: number;
}

export interface IRefundPayload {
  paymentId: string;
  amount: number;
  reason?: string;
}

export interface IAdminDashboardStats {
  totalUsers: number;
  totalOrganizations: number;
  totalProjects: number;
  totalTasks: number;
  recentUsers: {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: UserStatus;
    createdAt: string;
  }[];
}