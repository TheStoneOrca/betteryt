"use client";

import GetVideo from "@/app/actions/getvideo";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoPlayer from "./__components/videoplayer";
import { Loader2Icon } from "lucide-react";
import useUser from "@/app/hooks/useuserhook";

export default function VideoPage() {
  const { user, isLoaded } = useUser();

  const [videoDetails, setVideoDetails] = useState<any>();

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    try {
      GetVideo(Number(id)).then((res) => {
        if (res.error) {
          console.error(res.error);
          router.push("/home");
        } else {
          setVideoDetails(res.video);
        }
      });
    } catch (error) {
      console.error(error);
      router.push("/home");
    }
  }, []);
  return (
    <div className="w-full flex">
      {isLoaded && user ? (
        <div className="flex w-full">
          {videoDetails ? (
            <div className="flex flex-col w-full mt-5">
              <div className="flex justify-center items-center">
                <VideoPlayer
                  video={videoDetails.videofile as any}
                  videoid={videoDetails.videoid}
                  userid={user.userid}
                />
              </div>
            </div>
          ) : (
            <Loader2Icon className="flex justify-center items-center animate-spin" />
          )}
        </div>
      ) : (
        <Loader2Icon className="flex justify-center items-center animate-spin" />
      )}
    </div>
  );
}
