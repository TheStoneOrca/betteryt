"use client";

import {
  Camera,
  Home,
  ListStartIcon,
  PersonStanding,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Logo from "./logo";

export default function Sidebar() {
  const [sideBarOpen, setOpen] = useState<boolean>();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "h-full dark:bg-black bg-white dark:text-white text-black",
        sideBarOpen ? "w-64 transition-all" : "w-32 transition-all"
      )}
    >
      <div className="flex items-center mb-4    ">
        <Button
          onClick={() => setOpen(!sideBarOpen)}
          className="dark:bg-black bg-white w-16"
        >
          {sideBarOpen ? (
            <SidebarClose className="w-12 h-8" />
          ) : (
            <SidebarOpen className="w-12 h-8" />
          )}
        </Button>
        <div className={cn(!sideBarOpen && "hidden")}>
          <Logo />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col",
          !sideBarOpen ? "w-24 transition-all" : "w-56 transition-all"
        )}
      >
        <div className=" flex flex-col ml-3">
          <div className="flex flex-col">
            <h1 className="text-2xl">Main</h1>
            <div className="flex flex-col gap-y-2">
              <Button
                variant={pathname === "/home" ? "secondary" : "default"}
                className="flex w-full justify-start gap-x-2"
                onClick={() => {
                  router.push("/home");
                }}
              >
                <Home />
                <div className={cn(!sideBarOpen && "hidden")}>Home</div>
              </Button>
              <Button
                className="flex w-full justify-start gap-x-2"
                variant={pathname === "/studio" ? "secondary" : "default"}
                onClick={() => {
                  router.push("/studio");
                }}
              >
                <Camera />
                <div className={cn(!sideBarOpen && "hidden")}>Studio</div>
              </Button>
            </div>
          </div>
          <hr className="mt-2 mb-2" />

          <div className="flex flex-col">
            <h1 className="text-2xl">You</h1>
            <div className="flex flex-col gap-y-2">
              <Button
                className="flex w-full justify-start gap-x-2"
                onClick={() => {
                  router.push("/studio/stats");
                }}
              >
                <ListStartIcon />{" "}
                <div className={cn(!sideBarOpen && "hidden")}>
                  Your Statistics
                </div>
              </Button>
              <Button
                className="flex w-full justify-start gap-x-2"
                onClick={() => {
                  router.push(`/channel/id`);
                }}
              >
                <PersonStanding />
                <div className={cn(!sideBarOpen && "hidden")}>Your Channel</div>
              </Button>
              <Button
                className="flex w-full justify-start gap-x-2"
                onClick={() => {
                  router.push("/subscriptions");
                }}
              >
                <PersonStanding />
                <div className={cn(!sideBarOpen && "hidden")}>
                  Channels Subscribed Too
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
