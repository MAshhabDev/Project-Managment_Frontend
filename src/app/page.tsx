"use client";

import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Button } from "@/components/ui/button";
import {
  KanbanSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users2,
  CreditCard,
  ShieldCheck,
  Zap,
  Building2,
  Clock,
  Layers,
  MessageSquare,
  Lock,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Sticky Glass Navbar */}
      <PublicNavbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold shadow-xs">
              <Sparkles className="size-3.5" />
              <span>Next-Gen Agile Delivery Platform</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                Domain 8
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
              Supercharge Sprint Velocity with{" "}
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Agile Kanban
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Organize sprint tasks, coordinate cross-functional engineering squads, and automate project deliverables across enterprise multi-tenant workspaces.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/register">
                <Button size="lg" className="h-11 px-6 rounded-xl text-sm font-semibold gap-2 shadow-lg shadow-primary/20">
                  <span>Start Free Trial</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-6 rounded-xl text-sm font-semibold gap-2 border-border/80 bg-card/60 backdrop-blur-md"
                >
                  <Zap className="size-4 text-amber-500" />
                  <span>1-Click Demo Login</span>
                </Button>
              </Link>
            </div>

            {/* Tech Stack Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> Next.js 16 & Turbopack
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> React 19 Client
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> PostgreSQL & Prisma
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> bKash MFS PGW
              </span>
            </div>
          </div>
        </section>

        {/* 2. Interactive Kanban Visual Showcase */}
        <section id="workflow" className="py-12 lg:py-20 bg-muted/20 border-y border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                Workflow Orchestration
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
                Visual Kanban Boards for High-Velocity Teams
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Move tasks across sprint columns, inspect real-time audit logs, and collaborate with threaded comments.
              </p>
            </div>

            {/* Mockup Kanban Board */}
            <div className="p-4 sm:p-6 rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-2xl overflow-x-auto">
              <div className="flex items-start gap-4 min-w-[900px]">
                {/* Column: To Do */}
                <div className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-slate-400" />
                      To Do
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted border border-border">2</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/70 bg-card shadow-xs space-y-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 uppercase">Medium</span>
                    <h4 className="text-xs font-bold text-foreground">Setup Redis Rate Limiter</h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">Throttle aggressive authentication attempts.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-border/70 bg-card shadow-xs space-y-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20 uppercase">Low</span>
                    <h4 className="text-xs font-bold text-foreground">Update Privacy Policy docs</h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">Reflect bKash subscription refund clauses.</p>
                  </div>
                </div>

                {/* Column: In Progress */}
                <div className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-blue-500 ring-2 ring-blue-500/20" />
                      In Progress
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">1</span>
                  </div>
                  <div className="p-3 rounded-xl border border-primary/40 bg-card shadow-xs space-y-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 uppercase">Urgent</span>
                    <h4 className="text-xs font-bold text-foreground">Interactive bKash Payment Modal</h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">Simulate checkout dialog with OTP verification.</p>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground border-t border-border/50">
                      <span className="flex items-center gap-1"><MessageSquare className="size-3" /> 3 comments</span>
                      <span className="text-primary font-bold">Assigned</span>
                    </div>
                  </div>
                </div>

                {/* Column: In Review */}
                <div className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-amber-500 ring-2 ring-amber-500/20" />
                      In Review
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">1</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/70 bg-card shadow-xs space-y-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">High</span>
                    <h4 className="text-xs font-bold text-foreground">Admin User Ban/Unban API</h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">Security moderation guard implementation.</p>
                  </div>
                </div>

                {/* Column: Done */}
                <div className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                      Done
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">2</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/70 bg-card/60 shadow-xs space-y-2 opacity-80">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase">Complete</span>
                    <h4 className="text-xs font-bold line-through text-muted-foreground">JWT Refresh Token Flow</h4>
                  </div>
                  <div className="p-3 rounded-xl border border-border/70 bg-card/60 shadow-xs space-y-2 opacity-80">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase">Complete</span>
                    <h4 className="text-xs font-bold line-through text-muted-foreground">Automated Sprint Board Genesis</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Features Grid */}
        <section id="features" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                Enterprise Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">
                Everything Modern Engineering Teams Need
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Built specifically to solve high-friction collaboration bottlenecks in complex software projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-colors space-y-3">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <KanbanSquare className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Automated Agile Boards
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Creating any new project automatically instantiates a 4-column sprint board ready for instant task allocation.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-colors space-y-3">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Building2 className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Multi-Tenant Workspaces
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Manage multiple independent organizations and company workspaces with dedicated slug namespaces.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-colors space-y-3">
                <div className="size-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Users2 className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Team Squads & Allocation
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Group collaborators into functional squads (Frontend, Backend, QA) and assign direct task responsibility.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-colors space-y-3">
                <div className="size-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <CreditCard className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  bKash PGW Billing
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Seamless local mobile financial payment gateway integration with instant workspace subscription upgrades.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-colors space-y-3">
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  RBAC Route Guards
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Multi-layer authorization protects Admin, Manager, and Member routes against tampering and privilege escalation.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-colors space-y-3">
                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <MessageSquare className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Threaded Discussion & Audit
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Live task commenting combined with immutable chronological activity logs tracks every sprint alteration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Evaluator 1-Click Demo Showcase */}
        <section className="py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent border-t border-border/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Examiner & Evaluator Fast Track
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
                Experience All 3 Roles with 1-Click Demo Login
              </h2>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                No manual registration needed to test all capabilities. Choose a pre-seeded account on the sign-in page.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-2xl border border-purple-500/20 bg-card shadow-xs space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 uppercase">
                  Root Admin
                </span>
                <h4 className="text-sm font-bold text-foreground">Admin Workflow</h4>
                <p className="text-xs text-muted-foreground">
                  Global KPIs, platform-wide user ban/unban moderation, and bKash transaction refund audits.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-blue-500/20 bg-card shadow-xs space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 uppercase">
                  Org Manager
                </span>
                <h4 className="text-sm font-bold text-foreground">Manager Workflow</h4>
                <p className="text-xs text-muted-foreground">
                  Create organizations, invite teammates, configure functional squads, and launch agile projects.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-emerald-500/20 bg-card shadow-xs space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 uppercase">
                  Team Member
                </span>
                <h4 className="text-sm font-bold text-foreground">Member Workflow</h4>
                <p className="text-xs text-muted-foreground">
                  Move tasks across sprint stages, view assigned deliverables, post live comments, and audit profile.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/login">
                <Button size="lg" className="rounded-xl text-xs font-semibold gap-2 shadow-sm">
                  <span>Open 1-Click Demo Login</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-tr from-primary/10 via-primary/5 to-card p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-foreground">
                Ready to Accelerate Your Agile Delivery?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Join high-performing teams using TaskFlow SaaS to plan sprints, track velocity, and ship quality software faster.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link href="/register">
                  <Button size="lg" className="rounded-xl text-xs font-semibold shadow-md gap-1.5">
                    <span>Create Free Account</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="rounded-xl text-xs font-semibold">
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}