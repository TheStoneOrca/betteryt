"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import VideoCardTop from "./videocardtop";
import VideoCardFooter from "./videocardfooter";

export default function VideoCard(props: {
  videoid: number;
  videothumbnail: string;
  title: string;
  creator: string;
  channelicon: string;
  channelid: number;
}) {
  return (
    <div className="flex flex-col gap-y-2 dark:bg-black bg-white dark:text-white text-black w-64 h-48 rounded-lg items-center hover:cursor-pointer">
      <VideoCardTop
        videoid={props.videoid}
        videothumbnail={props.videothumbnail}
      />
      <VideoCardFooter
        creator={props.creator}
        channelicon={props.channelicon}
        title={props.title}
        channelid={props.channelid}
      />
    </div>
  );
}
