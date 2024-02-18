"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VideoCardFooter(props: {
  title: string;
  channelicon: string;
  creator: string;
  channelid: number;
}) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-x-2 ml-2">
      <div className="flex justify-start text-center items-center text-lg">
        {props.title}
      </div>
      <div className="justify-start flex text-sm">
        <h1
          className="flex items-center justify-center hover:cursor-pointer"
          onClick={() => {
            router.push(`/channel/${props.channelid}`);
          }}
        >
          <img
            className="rounded-full w-8"
            src={props.channelicon}
            alt="channelicon"
          />
          {props.creator}
        </h1>
      </div>
    </div>
  );
}
