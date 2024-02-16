"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContinueButton() {
  return (
    <Button asChild>
      <Link href="/signup">Start Now</Link>
    </Button>
  );
}
