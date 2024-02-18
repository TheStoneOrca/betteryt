"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChannelIcon(props: { iconUrl: string }) {
  return (
    <Avatar className="w-32 h-32">
      <AvatarImage src={props.iconUrl} />
      <AvatarFallback>Channel Icon</AvatarFallback>
    </Avatar>
  );
}
