import {
  executeBkashPayment,
  getOrganizationPaymentHistory,
  initiateBkashPayment,
  refundBkashPayment,
} from "@/api";
import { IBkashInitiatePayload, IRefundPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOrganizationPaymentsQuery(
  orgId: string,
  params?: { page?: number; limit?: number; status?: string }
) {
  return useQuery({
    queryKey: ["payments", orgId, params],
    queryFn: () => getOrganizationPaymentHistory(orgId, params),
    enabled: !!orgId,
  });
}

export function useInitiateBkashMutation() {
  return useMutation({
    mutationFn: (payload: IBkashInitiatePayload) =>
      initiateBkashPayment(payload),
    onError: (err: any) => {
      toast.error(
        err.data?.message || err.message || "Failed to initiate bKash payment"
      );
    },
  });
}

export function useExecuteBkashMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentID: string) => executeBkashPayment(paymentID),
    onSuccess: () => {
      toast.success("Payment completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (err: any) => {
      toast.error(
        err.data?.message || err.message || "Payment execution failed"
      );
    },
  });
}

export function useRefundPaymentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IRefundPayload) => refundBkashPayment(payload),
    onSuccess: () => {
      toast.success("Refund processed successfully!");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (err: any) => {
      toast.error(
        err.data?.message || err.message || "Refund processing failed"
      );
    },
  });
}
