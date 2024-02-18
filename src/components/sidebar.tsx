"use client";

import {
  Camera,
  ClipboardIcon,
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
        sideBarOpen ? "w-72 transition-all" : "w-32 transition-all"
      )}
    >
      <div className="flex items-center mb-4">
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
                variant={pathname === "/post" ? "secondary" : "default"}
                onClick={() => {
                  router.push("/post");
                }}
              >
                <Camera />
                <div className={cn(!sideBarOpen && "hidden")}>Create Video</div>
              </Button>
              <Button
                className="flex w-full justify-start gap-x-2"
                variant={
                  pathname === "/create/channel" ? "secondary" : "default"
                }
                onClick={() => {
                  router.push("/create/channel");
                }}
              >
                <ClipboardIcon />
                <div className={cn(!sideBarOpen && "hidden")}>
                  Create Channel
                </div>
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
                  router.push("/studio");
                }}
              >
                <ListStartIcon />{" "}
                <div className={cn(!sideBarOpen && "hidden")}>Studio</div>
              </Button>
              <Button
                className="flex w-full justify-start gap-x-2"
                onClick={() => {
                  router.push("/channels");
                }}
              >
                <PersonStanding />
                <div className={cn(!sideBarOpen && "hidden")}>
                  Your Channels
                </div>
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
