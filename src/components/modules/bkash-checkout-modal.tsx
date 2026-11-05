"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  useGetMe,
  useInitiateBkashMutation,
  useMyOrganizationsQuery,
} from "@/hooks";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  X,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface IBkashCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
}

export function BkashCheckoutModal({
  isOpen,
  onClose,
  planName,
  amount,
}: IBkashCheckoutModalProps) {
  const { data: userData } = useGetMe();
  const user = userData?.data;

  const { data: orgsData } = useMyOrganizationsQuery();
  const organizations = orgsData?.data || [];

  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const initiateMutation = useInitiateBkashMutation();

  if (!isOpen) return null;

  const activeOrgId = selectedOrgId || organizations[0]?.id || "";
  const selectedOrg =
    organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const handleProceedToBkash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrgId || !agreeTerms) return;

    initiateMutation.mutate(
      {
        organizationId: activeOrgId,
        amount: Number(amount),
      },
      {
        onSuccess: (res: any) => {
          const redirectUrl = res?.data?.bkashURL;
          if (redirectUrl) {
            toast.success("Redirecting to Official bKash Gateway... 🚀");
            window.location.href = redirectUrl;
          } else {
            toast.error("bKash redirect URL was not returned by gateway.");
          }
        },
        onError: (err: any) => {
          toast.error(
            err?.data?.message ||
              err?.message ||
              "Failed to initiate bKash payment",
          );
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* bKash Header */}
        <div className="bg-[#E2136E] text-white p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white text-[#E2136E] font-black text-sm px-2.5 py-0.5 rounded-md tracking-tighter shadow-xs">
                bKash
              </div>
              <span className="text-xs font-bold tracking-wide">
                Tokenized Payment Gateway
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white rounded-lg p-1 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex items-end justify-between pt-1 border-t border-white/20">
            <div>
              <p className="text-[11px] text-white/80 uppercase font-medium">
                Merchant
              </p>
              <p className="text-xs font-bold">TaskFlow SaaS Ltd.</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-white/80 uppercase font-medium">
                Amount
              </p>
              <p className="text-base font-black">
                ৳{amount.toLocaleString()} BDT
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {!user ? (
            /* Not Logged In State */
            <div className="text-center py-4 space-y-4">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Lock className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-foreground">
                  Sign In Required
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Please sign in to select which organization workspace you want
                  to upgrade with the {planName} plan.
                </p>
              </div>
              <Link href="/login" onClick={onClose}>
                <Button className="w-full rounded-xl text-xs font-semibold gap-1.5 shadow-sm">
                  <span>Sign In to Continue</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleProceedToBkash} className="space-y-4">
              {/* Workspace Selection */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-primary" />
                  Select Workspace to Upgrade
                </Label>
                {organizations.length > 0 ? (
                  <select
                    value={activeOrgId}
                    onChange={(e) => setSelectedOrgId(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-[#E2136E] transition-colors"
                    required
                  >
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name} (/{org.slug})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-destructive p-2.5 bg-destructive/10 rounded-xl">
                    No organizations found. Please create an organization first.
                  </p>
                )}
              </div>

              {/* Order Summary Card */}
              <div className="p-3.5 rounded-2xl border border-border/70 bg-muted/20 space-y-2 text-xs">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Selected Plan:</span>
                  <span className="font-bold text-foreground">{planName}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Workspace:</span>
                  <span className="font-semibold text-foreground font-mono">
                    {selectedOrg ? `${selectedOrg.name}` : "Workspace"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/40 text-foreground font-bold">
                  <span>Payable Total:</span>
                  <span className="text-sm font-black text-[#E2136E]">
                    ৳{amount.toLocaleString()} BDT
                  </span>
                </div>
              </div>

              {/* Official Gateway Sandbox Notice */}
              <div className="p-3 rounded-2xl bg-[#E2136E]/10 border border-[#E2136E]/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E2136E]">
                  <ShieldCheck className="size-4" />
                  <span>Official bKash Gateway PGW</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Clicking below will securely redirect you to bKash&apos;s
                  official checkout page (sandbox.payment.bka.sh) to authorize
                  this transaction.
                </p>
                <div className="pt-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-mono bg-background/60 p-2 rounded-xl border border-border/50">
                  <p className="font-bold text-foreground">
                    Sandbox Test Credentials:
                  </p>
                  <p>
                    Wallet: <span className="font-bold">01770618575</span> | OTP:{" "}
                    <span className="font-bold">123456</span> | PIN:{" "}
                    <span className="font-bold">12121</span>
                  </p>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-[#E2136E] focus:ring-[#E2136E]"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-[11px] cursor-pointer"
                >
                  I agree to the bKash Merchant terms & conditions.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  disabled={initiateMutation.isPending}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    !agreeTerms ||
                    organizations.length === 0 ||
                    initiateMutation.isPending
                  }
                  className="bg-[#E2136E] hover:bg-[#c0105d] text-white rounded-xl text-xs font-semibold px-5 shadow-sm min-w-44"
                >
                  {initiateMutation.isPending ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Redirecting to bKash...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Pay ৳{amount.toLocaleString()} with bKash</span>
                      <ExternalLink className="size-3.5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
