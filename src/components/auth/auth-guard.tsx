"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.replace("/login");
        return;
      }
      setHasCheckedToken(true);
    }
  }, [router]);

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
    return <AuthLoading label="Redirecting to login..." />;
  }

  if (!hasCheckedToken || isPending) {
    return <AuthLoading label="Authenticating user..." />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting to login..." />;
  }

  return <>{children}</>;
}
