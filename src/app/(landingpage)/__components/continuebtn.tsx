"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContinueBtn() {
  return (
    <Button asChild>
      <Link href="/home">Continue</Link>
    </Button>
  );
}
