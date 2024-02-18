"use client";

export default function ChannelIcon(props: { channelicon: string }) {
  return (
    <img
      src={props.channelicon}
      alt="channelicon"
      className="rounded-full w-8"
    />
  );
}
