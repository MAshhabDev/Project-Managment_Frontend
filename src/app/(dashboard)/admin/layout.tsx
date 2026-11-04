"use client";

import { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import { Role } from "@/types";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={[Role.ADMIN]}>
      {children}
    </RoleGuard>
  );
}
