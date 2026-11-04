"use client";

import { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import { Role } from "@/types";

export default function ManagerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={[Role.MANAGER, Role.ADMIN]}>
      {children}
    </RoleGuard>
  );
}
