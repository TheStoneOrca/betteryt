"use client";

import Link from "next/link";
import CreateChannelForm from "./__components/channelform";
import Header from "./__components/header";
import useUser from "@/app/hooks/useuserhook";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

export default function CreateChannel() {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    document.title = "Create A Channel";
  }, []);
  return (
    <>
      {isLoaded && user ? (
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex justify-center items-center text-center mt-1">
            <Header />
          </div>
          <div className="flex justify-center items-center h-[75vh]">
            <CreateChannelForm userid={user.userid} />
          </div>
          <div className=" flex-grow" />
          <div className="flex justify-center text-center items-center gap-x-1">
            By creating a channel, you have agreed to our
            <Link href="/terms-of-service" className="text-blue-300 underline">
              terms of service.
            </Link>
          </div>
          <div className="mt-12" />
        </div>
      ) : (
        <div className="flex w-full justify-center items-center">
          <Loader2Icon className="animate-spin w-72 h-72" />
        </div>
      )}
    </>
  );
}
