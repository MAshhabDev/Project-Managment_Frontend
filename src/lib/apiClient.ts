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
  onRequest({ options }) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${token}`);
        options.headers = headers;
      }
    }
  },
  async onResponseError({ response }) {
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
