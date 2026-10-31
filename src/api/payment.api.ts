import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  IBkashInitiatePayload,
  IPayment,
  IRefundPayload,
} from "@/types";

export function initiateBkashPayment(payload: IBkashInitiatePayload) {
  return apiClient<
    ApiResponse<{
      paymentID: string;
      bkashURL: string;
      amount: number;
      organizationId: string;
    }>
  >("/payments/bkash/initiate", {
    method: "POST",
    body: payload,
  });
}

export function executeBkashPayment(paymentID: string) {
  return apiClient<ApiResponse<IPayment>>("/payments/bkash/execute", {
    method: "POST",
    body: { paymentID },
  });
}

export function getOrganizationPaymentHistory(
  orgId: string,
  params?: { page?: number; limit?: number; status?: string }
) {
  return apiClient<ApiResponse<IPayment[]>>(`/payments/history/${orgId}`, {
    query: params,
  });
}

export function refundBkashPayment(payload: IRefundPayload) {
  return apiClient<ApiResponse<any>>("/payments/bkash/refund", {
    method: "POST",
    body: payload,
  });
}