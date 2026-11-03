"use client";

import Link from "next/link";
import { KanbanSquare, ShieldCheck, Heart } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <KanbanSquare className="size-4" />
              </div>
              <span className="font-heading font-black text-lg text-foreground">
                TaskFlow SaaS
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The high-velocity agile project management platform designed for modern engineering teams and organizations.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="size-3.5" />
              <span>Multi-Tenant Enterprise Security</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Interactive Kanban
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="hover:text-primary transition-colors">
                  Sprint Columns
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  bKash Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  1-Click Demo Logins
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Tech Stack
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Next.js 16 App Router</li>
              <li>React 19 & Turbopack</li>
              <li>Tailwind CSS v4 & Shadcn</li>
              <li>PostgreSQL & Prisma ORM</li>
              <li>bKash PGW API Integration</li>
            </ul>
          </div>

          {/* Links Column 3: Security & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Security & Legal
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Role-Based Access (RBAC)</li>
              <li>JWT & HTTP-Only Cookies</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>GDPR & Data Protection</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TaskFlow SaaS. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for Domain 8: Project Management SaaS 📋
          </p>
        </div>
      </div>
    </footer>
  );
}