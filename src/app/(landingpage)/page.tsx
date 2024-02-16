"use client";

import Header from "./__components/header";
import { cn } from "@/lib/utils";
import StartNowBtn from "./__components/startnowbtn";
import Cards from "./__components/cards";
import { useEffect } from "react";
import GetUserHook from "../hooks/getuserhook";
import { Loader2Icon } from "lucide-react";
import ContinueBtn from "./__components/continuebtn";

export default function LandingPage() {
  const { isSignedIn, isLoaded } = GetUserHook();
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
            This Website Fits Your Every Needs
          </h1>
        </div>
      </div>
      {isLoaded ? (
        <>
          {isSignedIn && (
            <div className="flex justify-center">
              <ContinueBtn />
            </div>
          )}
          {!isSignedIn && (
            <div className="flex justify-center">
              <StartNowBtn />
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
      <div className="mt-24" />
    </div>
  );
}
