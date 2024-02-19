"use client";

import SubscribeButton from "@/components/subscribebutton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChannelIcon(props: {
  iconUrl: string;
  channelid: number;
  userid: number;
  subscribes: number;
  alreadySubscribed: boolean;
}) {
  return (
    <div className="flex gap-x-2">
      <Avatar className="w-32 h-32">
        <AvatarImage src={props.iconUrl} />
        <AvatarFallback>Channel Icon</AvatarFallback>
      </Avatar>
      <SubscribeButton
        channelid={props.channelid}
        userid={props.userid}
        alreadySubscribed={props.alreadySubscribed}
        subscribes={props.subscribes}
      />
    </div>
  );
}
