"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Sparkles,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  KanbanSquare,
  Building2,
} from "lucide-react";
import { BkashCheckoutModal } from "@/components/modules/bkash-checkout-modal";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<{
    name: string;
    amount: number;
  } | null>(null);

  const plans = [
    {
      name: "Starter",
      badge: "Free Workspace",
      priceMonthly: 0,
      priceAnnual: 0,
      description: "Ideal for individual developers and small starter squads.",
      features: [
        "1 Tenant Organization",
        "Up to 2 Agile Kanban Boards",
        "Up to 5 Team Collaborators",
        "Standard Task Management",
        "Community Support",
      ],
      ctaText: "Get Started Free",
      ctaLink: "/register",
      popular: false,
    },
    {
      name: "Professional",
      badge: "Most Popular",
      priceMonthly: 1500,
      priceAnnual: 1200,
      description:
        "For fast-scaling engineering teams and agile delivery agencies.",
      features: [
        "Up to 5 Organizations",
        "Unlimited Agile Kanban Boards",
        "Unlimited Team Squads & Roles",
        "Live Task Comments & Discussion",
        "Complete Chronological Activity Logs",
        "Instant bKash MFS Gateway Payment",
        "Priority Email Support",
      ],
      ctaText: "Upgrade with bKash",
      ctaLink: "/login",
      popular: true,
    },
    {
      name: "Enterprise",
      badge: "Full Scale",
      priceMonthly: 4500,
      priceAnnual: 3600,
      description:
        "Dedicated security, audit trails, and multi-tenant management.",
      features: [
        "Everything in Professional",
        "Unlimited Organizations & Workspaces",
        "Admin Financial Audit & Refund Controls",
        "User Ban & Access Moderation",
        "99.9% Uptime SLA Guarantee",
        "Dedicated Account Representative",
      ],
      ctaText: "Subscribe Enterprise",
      ctaLink: "/login",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "How does the bKash payment integration work?",
      a: "We integrate directly with bKash Payment Gateway (PGW). You can initiate checkout, enter your wallet number, verify OTP, and activate your pro subscription instantly.",
    },
    {
      q: "Can I cancel or request a refund?",
      a: "Yes. Our platform includes an administrative refund workflow where administrators can review and issue full or partial refunds for your bKash transactions.",
    },
    {
      q: "Can I invite team members on the free starter plan?",
      a: "Yes! The free Starter plan allows up to 5 teammates to collaborate on Kanban boards before requiring a plan upgrade.",
    },
    {
      q: "Are there any hidden fees or contract lock-ins?",
      a: "No hidden charges. All prices are listed in Bangladeshi Taka (BDT) with complete transparency.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <PublicNavbar />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Sparkles className="size-3.5" />
              <span>Predictable SaaS Pricing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-foreground">
              Flexible Plans for Teams of All Sizes
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Start with our free workspace tier, scale seamlessly as your
              squads grow, and pay easily via local bKash mobile financial
              gateway.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
              <span
                className={
                  !isAnnual
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                }
              >
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAnnual ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isAnnual ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={
                  isAnnual
                    ? "text-foreground font-bold flex items-center gap-1.5"
                    : "text-muted-foreground flex items-center gap-1.5"
                }
              >
                <span>Annual Billing</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const currentPrice = isAnnual
                ? plan.priceAnnual
                : plan.priceMonthly;

              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-200 ${
                    plan.popular
                      ? "border-primary bg-card shadow-2xl ring-2 ring-primary/20 -translate-y-2"
                      : "border-border/80 bg-card/60 hover:border-primary/40"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-heading text-foreground">
                          {plan.name}
                        </h3>
                        {!plan.popular && (
                          <span className="text-[10px] font-semibold text-muted-foreground px-2 py-0.5 rounded-md bg-muted">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-2 border-t border-border/50">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black font-heading text-foreground">
                          ৳{currentPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          BDT / month
                        </span>
                      </div>
                      {isAnnual && plan.priceMonthly > 0 && (
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                          Billed annually (৳
                          {(currentPrice * 12).toLocaleString()} BDT/yr)
                        </p>
                      )}
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Included Features:
                      </span>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <Check className="size-4 text-primary shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-8">
                    {plan.priceMonthly > 0 ? (
                      <Button
                        onClick={() =>
                          setSelectedPlanForPayment({
                            name: plan.name,
                            amount: currentPrice,
                          })
                        }
                        className="w-full rounded-xl text-xs font-semibold gap-1.5 shadow-sm"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        <CreditCard className="size-3.5" />
                        <span>{plan.ctaText}</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    ) : (
                      <Link href={plan.ctaLink}>
                        <Button
                          className="w-full rounded-xl text-xs font-semibold gap-1.5 shadow-sm"
                          variant="outline"
                        >
                          <span>{plan.ctaText}</span>
                          <ArrowRight className="size-3.5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Banner */}
          <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0">
                <CreditCard className="size-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-foreground">
                  Official bKash PGW Checkout Simulation
                </h4>
                <p className="text-xs text-muted-foreground">
                  Instant subscription activations via real-time merchant token
                  verification.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="size-4" />
              <span>TLS 1.3 256-Bit Encrypted</span>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="pt-12 border-t border-border/60 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-heading text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-muted-foreground">
                Everything you need to know about our billing and subscription
                model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-border/70 bg-card space-y-2"
                >
                  <h4 className="text-sm font-bold text-foreground flex items-start gap-2">
                    <HelpCircle className="size-4 text-primary shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedPlanForPayment && (
          <BkashCheckoutModal
            isOpen={!!selectedPlanForPayment}
            onClose={() => setSelectedPlanForPayment(null)}
            planName={selectedPlanForPayment.name}
            amount={selectedPlanForPayment.amount}
          />
        )}
      </main>

      {/* Public Footer */}
      <PublicFooter />
    </div>
  );
}
