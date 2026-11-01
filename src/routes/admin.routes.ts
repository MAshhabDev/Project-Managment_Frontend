import { LayoutDashboard, Users, CreditCard, Shield } from "lucide-react";

export const adminRoutes = [
  {
    group: "Platform Administration",
    items: [
      {
        title: "Overview",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Payment Records",
        url: "/admin/payments",
        icon: CreditCard,
      },
    ],
  },
];