"use client";

import { ReactNode, useState } from "react";
import { Role } from "@/types";
import { useGetMe } from "@/hooks";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import AuthGuard from "@/components/auth/auth-guard";
import RoleGuard from "@/components/auth/role-guard";

interface IDashboardShellProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export default function DashboardShell({
  children,
  allowedRoles,
}: IDashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = useGetMe();
  const user = data?.data;

  return (
    <AuthGuard>
      <RoleGuard allowedRoles={allowedRoles}>
        <div className="min-h-screen bg-background flex">
          <DashboardSidebar
            role={user?.role || Role.MEMBER}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
            <DashboardHeader
              user={user}
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            />
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto w-full">{children}</div>
            </main>
          </div>
        </div>
      </RoleGuard>
    </AuthGuard>
  );
}