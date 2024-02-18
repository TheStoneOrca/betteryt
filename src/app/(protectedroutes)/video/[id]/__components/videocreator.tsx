"use client";

import Link from "next/link";
import ChannelIcon from "./channelicon";

export default function VideoCreator(props: {
  creator: string;
  channelid: string;
  channelicon: string;
}) {
  return (
    <Link href={`/channel/${props.channelid}`} className="text-sm flex gap-x-1">
      <ChannelIcon channelicon={props.channelicon} /> {props.creator}
    </Link>
  );
}
