import { LayoutDashboard, Building2, Users2, KanbanSquare, FolderKanban } from "lucide-react";

export const managerRoutes = [
  {
    group: "Organization & Projects",
    items: [
      {
        title: "Manager Overview",
        url: "/manager",
        icon: LayoutDashboard,
      },
      {
        title: "My Organizations",
        url: "/manager/organizations",
        icon: Building2,
      },
      {
        title: "Team Members",
        url: "/manager/teams",
        icon: Users2,
      },
      {
        title: "Projects & Boards",
        url: "/manager/projects",
        icon: FolderKanban,
      },
    ],
  },
];