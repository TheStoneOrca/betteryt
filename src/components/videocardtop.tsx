"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VideoCardTop(props: {
  videothumbnail: string;
  videoid: number;
}) {
  const router = useRouter();
  return (
    <img
      onClick={() => {
        router.push(`/video/${props.videoid}`);
      }}
      src={props.videothumbnail}
      alt="Video Thumbnail"
      className="object-fill w-full overflow-hidden rounded-lg"
    />
  );
}
