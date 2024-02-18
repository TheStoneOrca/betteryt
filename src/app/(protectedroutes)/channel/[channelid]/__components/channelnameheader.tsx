"use client";

export default function ChannelNameHeader(props: { channelname: string }) {
  return (
    <h1 className="lg:text-3xl md:text-5xl sm:text-4xl flex gap-x-2 items-center">
      {props.channelname}
    </h1>
  );
}
