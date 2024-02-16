"use client";

import React, { useEffect } from "react";
import useUser from "../hooks/useuserhook";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/signup");
    }
  }, [isLoaded]);
  return (
    <div className="flex h-full">
      <Sidebar />
      {children}
    </div>
  );
}
