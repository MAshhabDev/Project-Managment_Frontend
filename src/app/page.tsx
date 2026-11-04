"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
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
  MessageSquare,
  Lock,
  ChevronRight,
  Plus,
} from "lucide-react";

// Smooth spring animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <PublicNavbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          {/* Ambient Glow Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-primary/30 via-blue-500/15 to-transparent blur-3xl pointer-events-none rounded-full"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6"
          >
            {/* Announcement Badge */}
            <motion.div variants={fadeInUp} className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold shadow-xs">
                <Sparkles className="size-3.5" />
                <span>Next-Gen Agile Project Tracker</span>
                <ChevronRight className="size-3 text-primary/60" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08]"
            >
              Work together. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ship faster.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Stop drowning in messy task lists. Plan your sprints, coordinate your squads, and keep deliverables on track with visual Kanban boards.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-11 px-7 rounded-xl text-xs sm:text-sm font-semibold gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Start for Free</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-6 rounded-xl text-xs sm:text-sm font-semibold gap-2 border-border/80 bg-card/60 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Zap className="size-4 text-amber-500" />
                  <span>Try 1-Click Demo</span>
                </Button>
              </Link>
            </motion.div>

            {/* Simple Trust Bullets */}
            <motion.div
              variants={fadeInUp}
              className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> Instant setup in seconds
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" /> Local bKash gateway ready
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. Interactive Kanban Visual Showcase */}
        <section id="workflow" className="py-16 lg:py-24 bg-muted/20 border-y border-border/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-2 max-w-2xl mx-auto"
            >
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                Visual Workflow
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
                See Your Entire Sprint at a Glance
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Track every task from idea to launch across flexible sprint columns.
              </p>
            </motion.div>

            {/* Smooth Motion Kanban Board Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="p-4 sm:p-6 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-2xl overflow-x-auto"
            >
              <div className="flex items-start gap-4 min-w-[920px]">
                {/* Column 1: To Do */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-slate-400" />
                      To Do
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted border border-border">
                      2
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-2 hover:border-primary/40 transition-colors">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 uppercase">
                      Medium
                    </span>
                    <h4 className="text-xs font-bold text-foreground">
                      Design dark mode illustrations
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      Prepare SVG assets for the new workspace theme.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-2 hover:border-primary/40 transition-colors">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20 uppercase">
                      Low
                    </span>
                    <h4 className="text-xs font-bold text-foreground">
                      Update privacy policy
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      Review terms with legal team.
                    </p>
                  </div>
                </motion.div>

                {/* Column 2: In Progress */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-1 rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-primary/20">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-primary">
                      <span className="size-2 rounded-full bg-primary ring-2 ring-primary/20" />
                      In Progress
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      1
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-primary/40 bg-card shadow-xs space-y-2.5">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 uppercase">
                      Urgent
                    </span>
                    <h4 className="text-xs font-bold text-foreground">
                      bKash payment checkout integration
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      Connect merchant API with instant wallet PIN confirmation.
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground border-t border-border/50">
                      <span className="flex items-center gap-1 font-medium">
                        <MessageSquare className="size-3 text-primary" /> 4 updates
                      </span>
                      <span className="font-bold text-primary">Active Sprint</span>
                    </div>
                  </div>
                </motion.div>

                {/* Column 3: In Review */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-amber-500 ring-2 ring-amber-500/20" />
                      In Review
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      1
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-2 hover:border-primary/40 transition-colors">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">
                      High
                    </span>
                    <h4 className="text-xs font-bold text-foreground">
                      Admin user moderation panel
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      Review 1-click ban & unban permissions.
                    </p>
                  </div>
                </motion.div>

                {/* Column 4: Done */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-1 rounded-2xl border border-border/60 bg-muted/30 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-600">
                      <span className="size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                      Done
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      2
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/70 bg-card/60 shadow-xs space-y-2 opacity-80">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase">
                      Done
                    </span>
                    <h4 className="text-xs font-bold line-through text-muted-foreground">
                      JWT authentication flow
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/70 bg-card/60 shadow-xs space-y-2 opacity-80">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase">
                      Done
                    </span>
                    <h4 className="text-xs font-bold line-through text-muted-foreground">
                      Automated board creation
                    </h4>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Features Section with Smooth Stagger */}
        <section id="features" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-2 max-w-2xl mx-auto"
            >
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                Built for Clarity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">
                Everything You Need to Stay on Track
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Powerful features designed to keep your workflow simple, clear, and fast.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Feature 1 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs space-y-3"
              >
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <KanbanSquare className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Visual Kanban Boards
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every new project automatically starts with a clean 4-stage sprint board ready for work.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs space-y-3"
              >
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Building2 className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Team Workspaces
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Organize different companies or departments into clean, isolated workspaces.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs space-y-3"
              >
                <div className="size-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Users2 className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Functional Squads
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Group people into squads like Engineering, Design, or QA, and assign tasks with one click.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs space-y-3"
              >
                <div className="size-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <CreditCard className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Easy bKash Payments
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upgrade your plan seamlessly using your bKash wallet with instant OTP verification.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs space-y-3"
              >
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Smart Role Permissions
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Role-based access protects sensitive actions for Admins, Managers, and Members.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs space-y-3"
              >
                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <MessageSquare className="size-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">
                  Threaded Discussions
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Keep all task conversations, feedback, and audit logs together in one clear place.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. Test 1-Click Demo Sandbox */}
        <section className="py-16 bg-muted/20 border-t border-border/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Instant Evaluation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
                Experience All Roles in Seconds
              </h2>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                No need to type credentials manually. Simply pick an account on the sign-in page to start exploring.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl border border-purple-500/20 bg-card shadow-xs space-y-2"
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 uppercase">
                  Administrator
                </span>
                <h4 className="text-sm font-bold text-foreground">Admin Control</h4>
                <p className="text-xs text-muted-foreground">
                  System KPIs, user access moderation, and payment refund history.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl border border-blue-500/20 bg-card shadow-xs space-y-2"
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 uppercase">
                  Manager
                </span>
                <h4 className="text-sm font-bold text-foreground">Manager Space</h4>
                <p className="text-xs text-muted-foreground">
                  Create organizations, set up team squads, and launch agile projects.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl border border-emerald-500/20 bg-card shadow-xs space-y-2"
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 uppercase">
                  Member
                </span>
                <h4 className="text-sm font-bold text-foreground">Member Board</h4>
                <p className="text-xs text-muted-foreground">
                  Move tasks across sprint columns, post comments, and view profile.
                </p>
              </motion.div>
            </motion.div>

            <div className="pt-2">
              <Link href="/login">
                <Button size="lg" className="rounded-xl text-xs font-semibold gap-2 shadow-sm">
                  <span>Open Demo Sign-In</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Final CTA Banner */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-tr from-primary/10 via-primary/5 to-card p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-foreground">
                Ready to Organize Your Work?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Join forward-thinking teams shipping cleaner, faster software with TaskFlow today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link href="/register">
                  <Button size="lg" className="rounded-xl text-xs font-semibold shadow-md gap-1.5">
                    <span>Get Started Free</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="rounded-xl text-xs font-semibold">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Real-World Public Footer */}
      <PublicFooter />
    </div>
  );
}
