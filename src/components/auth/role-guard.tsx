"use client";

import { useGetMe } from "@/hooks";
import { Role } from "@/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";

interface IRoleGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export default function RoleGuard({ children, allowedRoles }: IRoleGuardProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  const isAuthorized = !!user && allowedRoles.includes(user.role);

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading label="Checking role permissions..." />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}