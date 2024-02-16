"use client";

import React, { useEffect } from "react";
import useUser from "../hooks/useuserhook";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      router.push("/home");
    }
  }, [isLoaded]);
  return <div>{children};</div>;
}
