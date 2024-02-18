"use client";

import GetVideo from "@/app/actions/getvideo";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoPlayer from "./__components/videoplayer";
import { Loader2Icon } from "lucide-react";
import useUser from "@/app/hooks/useuserhook";
import VideoTitle from "./__components/title";
import VideoCreator from "./__components/videocreator";

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
      {isLoaded && user && videoDetails ? (
        <div className="flex flex-col w-full mt-5">
          <div className="flex justify-center items-center">
            <VideoPlayer
              video={videoDetails.videofile as any}
              videoid={videoDetails.videoid}
              userid={user.userid}
            />
          </div>
          <div className="flex justify-center items-center text-center">
            <div className="flex flex-col justify-start w-[1000px] mt-1 gap-y-2 items-start">
              <VideoTitle title={videoDetails.videotitle} />
              <VideoCreator
                channelicon={videoDetails.channelprofile}
                creator={videoDetails.channelname}
                channelid={videoDetails.channelid}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader2Icon className="flex justify-center items-center animate-spin" />
      )}
    </div>
  );
}
