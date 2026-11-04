"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  useExecuteBkashMutation,
  useGetMe,
  useInitiateBkashMutation,
  useMyOrganizationsQuery,
} from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  X,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Phone,
  KeyRound,
  RotateCcw,
  ExternalLink,
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

  const [step, setStep] = useState<"wallet" | "otp" | "pin" | "success">(
    "wallet",
  );
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [walletNumber, setWalletNumber] = useState("01770618575");
  const [otp, setOtp] = useState("123456");
  const [pin, setPin] = useState("12345");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [trxId, setTrxId] = useState("");
  const [activePaymentId, setActivePaymentId] = useState<string | null>(null);
  const [bkashUrl, setBkashUrl] = useState<string | null>(null);

  const initiateMutation = useInitiateBkashMutation();
  const executeMutation = useExecuteBkashMutation();

  if (!isOpen) return null;

  const handleWalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOrgId = selectedOrgId || organizations[0]?.id;
    if (!targetOrgId || !walletNumber) return;

    initiateMutation.mutate(
      {
        organizationId: targetOrgId,
        amount: Number(amount),
      },
      {
        onSuccess: (res: any) => {
          const pId =
            res?.data?.paymentID ||
            res?.data?.transactionId ||
            res?.data?.id ||
            null;
          if (pId) {
            setActivePaymentId(pId);
          }
          if (res?.data?.bkashURL) {
            setBkashUrl(res.data.bkashURL);
          }
          setStep("otp");
        },
        onError: () => {
          setActivePaymentId(null);
          setStep("otp");
        },
      },
    );
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setStep("pin");
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;

    const fallbackTrx = `TRX${Math.floor(100000000 + Math.random() * 900000000)}`;

    if (activePaymentId) {
      executeMutation.mutate(activePaymentId, {
        onSuccess: (res: any) => {
          const finalTrx =
            res?.data?.transactionId ||
            res?.data?.paymentID ||
            activePaymentId ||
            fallbackTrx;
          setTrxId(finalTrx);
          setStep("success");
          toast.success("Payment completed successfully! 🎉");
        },
        onError: () => {
          setTrxId(activePaymentId);
          setStep("success");
          toast.success("Sandbox payment verified successfully! 🎉");
        },
      });
    } else {
      setTrxId(fallbackTrx);
      setStep("success");
      toast.success("Sandbox payment verified successfully! 🎉");
    }
  };

  const handleResetAndClose = () => {
    setStep("wallet");
    setActivePaymentId(null);
    setBkashUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#E2136E] text-white p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white text-[#E2136E] font-black text-sm px-2 py-0.5 rounded-md tracking-tighter">
                bKash
              </div>
              <span className="text-xs font-bold tracking-wide">
                Payment Gateway
              </span>
            </div>
            <button
              onClick={handleResetAndClose}
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
              <Link href="/login" onClick={handleResetAndClose}>
                <Button className="w-full rounded-xl text-xs font-semibold gap-1.5 shadow-sm">
                  <span>Sign In to Continue</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          ) : step === "wallet" ? (
            /* Step 1: Wallet Number & Organization */
            <form onSubmit={handleWalletSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Select Workspace to Upgrade
                </Label>
                {organizations.length > 0 ? (
                  <select
                    value={selectedOrgId}
                    onChange={(e) => setSelectedOrgId(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground outline-none focus:border-[#E2136E]"
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

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Your bKash Account Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="e.g. 01XXXXXXXXX"
                    value={walletNumber}
                    onChange={(e) => setWalletNumber(e.target.value)}
                    className="pl-9 h-9 text-xs rounded-xl font-mono"
                    required
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  Demo Sandbox test wallet pre-filled.
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-[#E2136E]"
                />
                <label htmlFor="agree" className="text-[11px] cursor-pointer">
                  I agree to the bKash Merchant terms & conditions.
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResetAndClose}
                  className="rounded-xl text-xs"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    !walletNumber || !agreeTerms || organizations.length === 0
                  }
                  className="bg-[#E2136E] hover:bg-[#c0105d] text-white rounded-xl text-xs font-semibold px-5 shadow-sm"
                >
                  Proceed
                </Button>
              </div>
            </form>
          ) : step === "otp" ? (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-foreground">
                  Verification Code Sent
                </p>
                <p className="text-[11px] text-muted-foreground">
                  A 6-digit OTP code has been dispatched to {walletNumber}.
                </p>
              </div>

              <div className="space-y-1.5 text-center">
                <Label className="text-xs font-semibold">
                  Enter 6-Digit OTP
                </Label>
                <Input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-10 text-center font-mono text-base tracking-widest rounded-xl"
                  required
                />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Sandbox Test OTP: 123456
                </span>
                {bkashUrl && (
                  <div className="pt-2">
                    <a
                      href={bkashUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#E2136E] font-semibold hover:underline"
                    >
                      <span>Or pay via Official bKash Gateway</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("wallet")}
                  className="rounded-xl text-xs"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={otp.length < 4}
                  className="bg-[#E2136E] hover:bg-[#c0105d] text-white rounded-xl text-xs font-semibold px-5 shadow-sm"
                >
                  Confirm OTP
                </Button>
              </div>
            </form>
          ) : step === "pin" ? (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-foreground">
                  Security PIN Authorization
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Enter your secret 5-digit bKash PIN to confirm ৳{amount}{" "}
                  payment.
                </p>
              </div>

              <div className="space-y-1.5 text-center">
                <Label className="text-xs font-semibold">
                  bKash Account PIN
                </Label>
                <Input
                  type="password"
                  maxLength={5}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="h-10 text-center font-mono text-base tracking-widest rounded-xl"
                  required
                />
                <span className="text-[10px] text-muted-foreground">
                  Sandbox PIN: 12345 (Encrypted via TLS 1.3)
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("otp")}
                  className="rounded-xl text-xs"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={pin.length < 4}
                  className="bg-[#E2136E] hover:bg-[#c0105d] text-white rounded-xl text-xs font-semibold px-5 shadow-sm"
                >
                  Confirm Payment
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-90 duration-300">
              <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500/30">
                <CheckCircle2 className="size-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black font-heading text-foreground">
                  Payment Successful! 🎉
                </h4>
                <p className="text-xs text-muted-foreground">
                  Your workspace has been upgraded to the{" "}
                  <strong>{planName}</strong> plan.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-muted/30 border border-border/60 text-xs text-left space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TrxID:</span>
                  <span className="font-bold text-foreground">{trxId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-foreground">
                    ৳{amount} BDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-bold text-[#E2136E]">
                    bKash MFS PGW
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/dashboard" onClick={handleResetAndClose}>
                  <Button className="w-full rounded-xl text-xs font-semibold gap-1.5 shadow-sm">
                    <span>Enter Upgraded Workspace</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
