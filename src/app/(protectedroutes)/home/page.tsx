"use client";

import GetAllVideos from "@/app/actions/getallvideos";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import VideoCard from "@/components/video";

export default function HomePage() {
  const [videos, setVideos] = useState<Array<any>>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    try {
      document.title = "Home";
      GetAllVideos().then((res: any) => {
        if (res.error) {
          setError(res.error);
        } else {
          setVideos(res.videos);
        }
      });
    } catch (error) {}
  }, []);
  return (
    <div className="flex">
      {videos ? (
        <div className="flex gap-x-2">
          {videos.map((video) => (
            <div className="ml-5 mt-5" key={video.videoid}>
              <VideoCard
                title={video.videotitle}
                channelid={video.channelid}
                creator={video.channelname}
                channelicon={video.videothumbnail}
                videoid={video.videoid}
                videothumbnail={video.videothumbnail}
              />
            </div>
          ))}
        </div>
      ) : (
        <Loader2Icon className="animate-spin items-center justify-center text-center" />
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
}
