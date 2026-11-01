import { LayoutDashboard, KanbanSquare, UserCircle } from "lucide-react";

export const memberRoutes = [
  {
    group: "Workspace",
    items: [
      {
        title: "My Workspace",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Kanban Board",
        url: "/dashboard/projects",
        icon: KanbanSquare,
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];