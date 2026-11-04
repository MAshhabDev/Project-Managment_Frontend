import { ofetch } from "ofetch";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://project-management-delta-blush.vercel.app/api/v1";

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
  async onResponseError({ response }) {
    // Expected client / auth rejections are handled by UI components & toast notifications
    const msg = String(response._data?.message || "").toLowerCase();
    if (
      response.status === 401 ||
      response.status === 403 ||
      msg.includes("not logged in") ||
      msg.includes("unauthorized") ||
      msg.includes("jwt")
    ) {
      return;
    }
  },
});

export default apiClient;
