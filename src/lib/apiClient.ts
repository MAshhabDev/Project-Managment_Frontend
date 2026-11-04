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
    // 401 বা guest ইউজার যখন পেজে প্রথম আসে তখন এটি স্বাভাবিক, কনসোলে এরর স্প্যাম বন্ধ রাখা হলো
    const msg = String(response._data?.message || "").toLowerCase();
    if (
      response.status === 401 ||
      msg.includes("not logged in") ||
      msg.includes("unauthorized") ||
      msg.includes("jwt")
    ) {
      return;
    }
    console.error("API Error Response:", response._data);
  },
});

export default apiClient;
