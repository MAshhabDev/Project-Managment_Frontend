"use client";

import Link from "next/link";
import { KanbanSquare, ShieldCheck, Globe, ExternalLink } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <KanbanSquare className="size-4" />
              </div>
              <span className="font-heading font-black text-lg text-foreground">
                TaskFlow
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The visual project tracker built for high-performing teams who love shipping clean work without friction.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="size-3.5" />
              <span>Secure Multi-Tenant Cloud</span>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/#workflow" className="hover:text-primary transition-colors">
                  Kanban Boards
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Sprint Columns
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Demo Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  bKash Payment Guide
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="hover:text-primary transition-colors">
                  Team Collaboration
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">About Us</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">Security</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Clean copyright without runtime Date() call */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 TaskFlow Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors flex items-center gap-1">
              <Globe className="size-3.5" /> Worldwide
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors flex items-center gap-1">
              <ExternalLink className="size-3.5" /> API Status
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
