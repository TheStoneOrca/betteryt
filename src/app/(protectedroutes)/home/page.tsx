"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return <div></div>;
}
