"use client";

import React, { useEffect } from "react";
import useChannel from "@/app/hooks/usechannel";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isInAChannel, isReady } = useChannel();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!isInAChannel) {
      router.push("/home");
    }
  }, [isReady]);
  return <div className="flex h-full w-full">{children}</div>;
}
