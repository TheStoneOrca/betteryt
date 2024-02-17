"use client";

import useChannel from "@/app/hooks/usechannel";
import Header from "./__components/header";
import VideoForm from "./__components/postform";
import { Loader2Icon } from "lucide-react";

export default function PostPage() {
  const { isReady, channel } = useChannel();
  return (
    <div className="w-full flex">
      {isReady && channel ? (
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex justify-center text-center mt-1">
            <Header />
          </div>
          <div className="flex justify-center items-center h-[75vh]">
            <VideoForm channelid={channel.channelid} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </div>
  );
}
