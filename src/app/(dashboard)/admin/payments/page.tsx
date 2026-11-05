"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useMyOrganizationsQuery,
  useOrganizationPaymentsQuery,
  useRefundPaymentMutation,
  useExecuteBkashMutation,
} from "@/hooks";
import { IPayment, PaymentStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Building2,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  Sparkles,
  X,
  ShieldCheck,
} from "lucide-react";

export default function AdminPaymentsPage() {
  const { data: orgsData, isLoading: isLoadingOrgs } =
    useMyOrganizationsQuery();
  const organizations = orgsData?.data || [];

  const [selectedOrgId, setSelectedOrgId] = useState<string>("");
  const activeOrgId = selectedOrgId || organizations[0]?.id || "";

  const { data: paymentsData, isLoading: isLoadingPayments } =
    useOrganizationPaymentsQuery(activeOrgId);
  const payments: IPayment[] = (paymentsData?.data as IPayment[]) || [];

  const refundMutation = useRefundPaymentMutation();
  const executeMutation = useExecuteBkashMutation();

  const [refundTarget, setRefundTarget] = useState<IPayment | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundReason, setRefundReason] = useState("");

  const handleOpenRefund = (payment: IPayment) => {
    setRefundTarget(payment);
    setRefundAmount(payment.amount);
    setRefundReason("Client requested subscription refund");
  };

  const handleExecuteRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundTarget || refundAmount <= 0) return;

    refundMutation.mutate(
      {
        paymentId: refundTarget.id,
        amount: Number(refundAmount),
        reason: refundReason,
      },
      {
        onSuccess: () => {
          setRefundTarget(null);
          setRefundReason("");
        },
      }
    );
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case PaymentStatus.FAILED:
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  const totalRevenue = payments
    .filter((p: IPayment) => p.status === PaymentStatus.SUCCESS)
    .reduce((acc: number, curr: IPayment) => acc + (curr.amount || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <CreditCard className="size-4" />
            <span>Financial Audit</span>
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
            Payment & Gateway Records
          </h1>
          <p className="text-xs text-muted-foreground">
            Audit bKash subscription transactions, review gateway statuses, and issue administrative refunds.
          </p>
        </div>

        <Link href="/admin">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl text-xs gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            Back to Overview
          </Button>
        </Link>
      </div>

      {/* Gateway Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-1">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <CreditCard className="size-3.5 text-primary" /> Gateway Provider
          </span>
          <p className="text-xl font-black font-heading text-foreground">
            bKash PGW (MFS)
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="size-3" /> Sandbox Gateway Live
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-1">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-emerald-500" /> Settled Volume
          </span>
          <p className="text-xl font-black font-heading text-foreground">
            ৳{totalRevenue.toLocaleString()} BDT
          </p>
          <p className="text-[11px] text-muted-foreground">
            From successful subscriptions
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border/70 bg-card shadow-xs space-y-1">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Calendar className="size-3.5 text-blue-500" /> Total Records
          </span>
          <p className="text-xl font-black font-heading text-foreground">
            {payments.length} Transactions
          </p>
          <p className="text-[11px] text-muted-foreground">
            Audit log entries captured
          </p>
        </div>
      </div>

      {organizations.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-muted-foreground flex items-center gap-1 font-semibold text-xs mr-1 shrink-0">
            <Building2 className="size-3.5" /> Workspace Audit:
          </span>
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => setSelectedOrgId(org.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 border ${
                activeOrgId === org.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-muted/30 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
              }`}
            >
              {org.name}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs">
        {isLoadingOrgs || isLoadingPayments ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-14 rounded-xl bg-muted/20 animate-pulse border border-border/30"
              />
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <CreditCard className="size-10 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold text-foreground">
              No Transactions Recorded
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No payments have been initiated or executed for this organization yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/60 bg-muted/30 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Transaction ID</th>
                  <th className="py-3.5 px-4">Method</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Gateway Status</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4 text-right">Refund Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {payments.map((p: IPayment) => {
                  const isSuccess = p.status === PaymentStatus.SUCCESS;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      {/* Transaction ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                        {p.transactionId || `TRX-${p.id.slice(0, 8).toUpperCase()}`}
                      </td>

                      {/* Method */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-foreground uppercase text-[11px]">
                          {p.paymentMethod || "bKash"}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        ৳{p.amount.toLocaleString()} {p.currency || "BDT"}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(
                            p.status
                          )}`}
                        >
                          {p.status}
                        </span>
                        {p.status === PaymentStatus.PENDING && (
                          <span className="block text-[9px] text-amber-600 dark:text-amber-400 mt-1 font-medium leading-tight">
                            Awaiting Gateway Callback
                          </span>
                        )}
                        {p.status === PaymentStatus.SUCCESS && (
                          <span className="block text-[9px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium leading-tight">
                            Settled via bKash PGW
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-muted-foreground/60" />
                          {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        {isSuccess ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenRefund(p)}
                            className="rounded-xl text-xs gap-1.5 shadow-2xs hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                          >
                            <RotateCcw className="size-3.5" />
                            <span>Issue Refund</span>
                          </Button>
                        ) : p.status === PaymentStatus.PENDING ? (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={executeMutation.isPending}
                            onClick={() =>
                              executeMutation.mutate(p.transactionId)
                            }
                            className="rounded-xl text-xs gap-1.5 shadow-2xs border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                          >
                            <CheckCircle2 className="size-3.5" />
                            <span>Verify & Settle</span>
                          </Button>
                        ) : (
                          <span className="text-[11px] text-muted-foreground italic">
                            Non-refundable
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {refundTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setRefundTarget(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                  <RotateCcw className="size-4 text-destructive" />
                  Issue bKash Refund
                </h3>
                <p className="text-xs text-muted-foreground">
                  Transaction: <strong className="font-mono">{refundTarget.transactionId || refundTarget.id.slice(0, 8)}</strong>
                </p>
              </div>
              <button
                onClick={() => setRefundTarget(null)}
                className="rounded-xl p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteRefund} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Refund Amount (BDT)</Label>
                <Input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(Number(e.target.value))}
                  max={refundTarget.amount}
                  min={1}
                  className="h-9 text-xs rounded-xl font-mono"
                  required
                />
                <span className="text-[10px] text-muted-foreground">
                  Original settlement: ৳{refundTarget.amount} BDT
                </span>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Refund Reason</Label>
                <Input
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="e.g. Accidental double charge, Customer request"
                  className="h-9 text-xs rounded-xl"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRefundTarget(null)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="destructive"
                  disabled={refundAmount <= 0 || refundMutation.isPending}
                  className="rounded-xl text-xs"
                >
                  {refundMutation.isPending ? "Refunding..." : "Confirm Refund"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
