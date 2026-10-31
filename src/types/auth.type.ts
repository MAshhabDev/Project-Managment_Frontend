export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export enum AuthProvider {
  CREDENTIAL = "CREDENTIAL",
  GOOGLE = "GOOGLE",
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  role: Role;
  status: UserStatus;
  emailVerified: boolean;
  authProvider: AuthProvider;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginPayload {
  email: string;
  password?: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password?: string;
}

export interface IVerifyEmailPayload {
  email: string;
  otp: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  newPassword?: string;
}