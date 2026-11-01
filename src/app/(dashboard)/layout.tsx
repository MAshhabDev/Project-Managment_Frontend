"use client";

import { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Role } from "@/types";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell allowedRoles={[Role.MEMBER, Role.MANAGER, Role.ADMIN]}>
      {children}
    </DashboardShell>
  );
}