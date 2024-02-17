"use client";

import Link from "next/link";
import CreateChannelForm from "./__components/channelform";
import Header from "./__components/header";
import useUser from "@/app/hooks/useuserhook";
import { Loader2Icon } from "lucide-react";

export default function CreateChannel() {
  const { isLoaded, user } = useUser();
  console.log(user);
  return (
    <>
      {isLoaded && user ? (
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex justify-center items-center text-center">
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
          <div className="mt-10" />
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </>
  );
}
