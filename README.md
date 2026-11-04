# TaskFlow SaaS — Agile Project Management Platform 📋⚡

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An enterprise-grade, multi-tenant Agile Project Management SaaS built for **Assignment B7A7 (Domain 8: Project Management SaaS 📋)**. Designed with Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, and TanStack Query, offering a high-performance interactive Kanban board, organization workspace management, squad assignments, threaded discussions, and bKash PGW subscription billing.

---

## 🌐 Live Deployment & Backend API

- **Frontend App:** Local (`http://localhost:3000`) / Vercel Production
- **Live Deployed API:** [`https://project-management-delta-blush.vercel.app/api/v1`](https://project-management-delta-blush.vercel.app/api/v1)
- **API Status:** Live & Verified 🟢 (CORS configured with credential cookie support)

---

## 🔐 1-Click Demo Credentials (Test Accounts)

You can use the 1-Click Fast-Pass buttons directly on the Login page (`/login`) or enter the credentials below:

| Role | Email | Password | Access & Capabilities |
| :--- | :--- | :--- | :--- |
| **🛡️ System Admin** | `admin@gmail.com` | `admin@12345` | Global Platform Overview, User Management, Ban/Unban, Payment & Refund Auditing |
| **🏢 Org Manager** | `manager@gmail.com` | `manager@12345` | Organization Setup, Squad/Team Creation, Project Configuration, Task Assignment |
| **💻 Team Member** | `member@gmail.com` | `member@12345` | Interactive Kanban Board, Drag & Drop Status, Threaded Comments, Profile Settings |

---

## ✨ Core Features & Highlights

### 1. 🎨 Modern Cyberpunk / Neon Theme & Smooth UI
- **Electric Indigo & Cyan Aesthetic:** Vibrant dark mode styling inspired by Linear and Vercel with frosted glass cards, subtle neon glows, and gradient typography.
- **Physics-Based Animations:** Ultra-smooth transitions powered by **Framer Motion** (`easeOut` springs and staggered list views).
- **Zero-Hydration Mismatch:** Optimized for Next.js 16 prerendering and SSR.

### 2. 📋 Interactive Agile Kanban Board (`/dashboard/projects/[id]`)
- **Visual Status Columns:** Backlog, In Progress, Review, and Done.
- **Rich Task Cards:** Priority badges (Urgent, High, Medium, Low), due date countdowns, assigned squad tags, and comment counters.
- **Task Detail Modal:** Real-time inline status switcher, rich description editor, and threaded activity feed.

### 3. 🏢 Multi-Tenant Workspace & Team Squads (`/manager`)
- **Organization Hierarchy:** Create, configure, and switch between multi-tenant workspaces.
- **Squad / Team Creation:** Group team members by functional departments (Frontend, Backend, DevOps, Design, QA).
- **Task Delegation:** Assign projects and tasks with granular roles and responsibilities.

### 4. 🛡️ System Administration & User Moderation (`/admin`)
- **Global KPIs:** Real-time platform metrics (total registered users, active projects, MRR revenue).
- **User Moderation Table:** Filter by role, toggle account suspension / ban with instant optimistic UI updates.
- **Transaction Audit Log:** Searchable transaction history with bKash trxID tracking and refund action trigger.

### 5. 💳 bKash Payment Gateway Integration (`/pricing`)
- **SaaS Subscription Tiers:** Starter (Free), Pro Team, and Enterprise plans.
- **Interactive bKash Modal:** Simulated authentic bKash checkout experience with OTP confirmation, PIN validation, and automatic receipt generation.

---

## 📂 Project Architecture & Folder Structure

```
Frontend/
├── public/                     # Static assets, SVG icons, and mock avatars
├── src/
│   ├── api/                    # Type-safe API client callers (ofetch)
│   │   ├── auth.api.ts         # Login, Register, Logout, GetMe, Refresh
│   │   ├── organization.api.ts # Workspace creation, member invites
│   │   ├── project.api.ts      # Project CRUD, Kanban task management
│   │   ├── user.api.ts         # User moderation, profile update
│   │   └── payment.api.ts      # Checkout initialization, refund verification
│   ├── app/                    # Next.js 16 App Router
│   │   ├── (dashboard)/        # Protected workspace routes
│   │   │   ├── admin/          # Admin Control Center (Users, Payments)
│   │   │   ├── manager/        # Manager Hub (Orgs, Squads, Projects)
│   │   │   ├── dashboard/      # Team Member Kanban & Task Views
│   │   │   ├── loading.tsx     # Skeleton loading state
│   │   │   └── error.tsx       # Route error boundary
│   │   ├── (public)/           # Public unauthenticated routes
│   │   │   ├── (authentication)/
│   │   │   │   ├── login/      # Classy login with 1-click fast pass
│   │   │   │   ├── register/   # 2-step registration & OTP confirmation
│   │   │   │   └── verify-otp/ # 6-digit OTP code verification
│   │   │   └── pricing/        # Subscription tiers & bKash checkout
│   │   ├── globals.css         # Tailwind v4 theme, neon glow utilities
│   │   ├── layout.tsx          # Root layout with fonts & ThemeProvider
│   │   ├── page.tsx            # Animated Framer Motion landing page
│   │   └── not-found.tsx       # Custom 404 page
│   ├── components/             # Reusable UI & Layout Components
│   │   ├── auth/               # RoleGuard, AuthGuard
│   │   ├── dashboard/          # Sidebar, Header, Kanban columns, Modals
│   │   ├── layout/             # PublicNavbar, PublicFooter
│   │   └── ui/                 # Shadcn Base UI primitives (Button, Dialog, Card)
│   ├── hooks/                  # TanStack Query custom hooks
│   │   ├── useAuth.ts          # Auth mutations, session state
│   │   ├── useOrganization.ts  # Workspace queries & mutations
│   │   ├── useProject.ts       # Kanban queries & task updates
│   │   ├── useUser.ts          # User management queries
│   │   └── usePayment.ts       # Payment & subscription hooks
│   ├── lib/                    # Utilities & API client
│   │   ├── apiClient.ts        # ofetch instance with error interception
│   │   └── utils.ts            # ClassName merge & formatting helpers
│   ├── providers/              # Root providers (QueryClient, ThemeProvider)
│   └── types/                  # Strict TypeScript domain interfaces
│       ├── auth.types.ts
│       ├── organization.types.ts
│       ├── project.types.ts
│       ├── payment.types.ts
│       └── api.types.ts
└── .env.example                # Environment template
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Project Management/Frontend"
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure the API base URL points to the live backend:
```env
NEXT_PUBLIC_API_BASE_URL=https://project-management-delta-blush.vercel.app/api/v1
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Run Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Typecheck & Build
```bash
# Verify TypeScript strictly
pnpm exec tsc --noEmit

# Production build
pnpm run build
```

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | High-performance React framework with server components and streaming |
| **React 19** | Latest React runtime with optimized hooks and transitions |
| **Tailwind CSS v4** | Next-generation atomic styling engine with CSS variables and `@theme` |
| **@base-ui/react / Shadcn** | Accessible headless UI primitives |
| **TanStack React Query v5**| Asynchronous state management, server cache, and optimistic updates |
| **ofetch** | Lightweight, type-safe HTTP client with automatic cookie handling |
| **Framer Motion** | Physics-based spring animations and micro-interactions |
| **Sonner** | Clean toast notifications for user interactions |
| **Lucide React** | Scalable, accessible modern icon system |

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
