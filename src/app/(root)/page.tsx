"use client";

import Header from "./__components/header";
import { cn } from "@/lib/utils";
import ContinueButton from "./__components/continuebtn";
import Cards from "./__components/cards";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "CocoTube";
  }, []);
  return (
    <div className={cn("flex flex-col min-h-screen")}>
      <div className="flex-grow justify-center mt-1 ml-1">
        <div className="mb-5">
          <Header />
        </div>
        <div className="flex justify-center mt-32">
          <Cards />
        </div>
        <div className="flex justify-center mt-2">
          <h1 className="lg:text-md md:text-lg sm:text-lg">
            This Website Fits Your Every needs
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <ContinueButton />
      </div>
      <div className="mt-24" />
    </div>
  );
}
