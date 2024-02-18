"use client";

import GetAllChannelVideos from "@/app/actions/getallchannelvideos";
import VideoCard from "@/components/video";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChannelVideoPage() {
  const [videos, setVideos] = useState<Array<any>>();
  const { channelid } = useParams();
  const router = useRouter();

  useEffect(() => {
    try {
      GetAllChannelVideos(Number(channelid)).then((res) => {
        if (res.error) {
          console.error(res.error);
          router.push("/home");
        } else {
          setVideos(res.videos);
          console.log(res);
        }
      });
    } catch (error) {
      console.error(error);
      router.push("/home");
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      {videos ? (
        <>
          <div className="flex justify-center items-center text-center">
            <Link
              href={`/channel/${channelid}`}
              className="lg:text-3xl md:text-5xl sm:text-4xl flex gap-x-2 items-center"
            >
              {videos[0].channelname}
            </Link>
          </div>
          <div className="flex gap-x-10 mt-10 ml-10">
            {videos.map((video) => (
              <VideoCard
                key={video.videoid}
                title={video.videotitle}
                channelid={video.channelid}
                creator={video.channelname}
                channelicon={video.videothumbnail}
                videoid={video.videoid}
                videothumbnail={video.videothumbnail}
              />
            ))}
          </div>
        </>
      ) : (
        <Loader2Icon className="animate-spin justify-center flex items-center" />
      )}
    </div>
  );
}
