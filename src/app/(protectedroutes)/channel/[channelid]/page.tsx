"use client";

import GetChannelDetails from "@/app/actions/getchanneldetails";
import VideoCard from "@/components/video";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChannelIcon from "./__components/channelicon";
import ChannelNameHeader from "./__components/channelnameheader";

export default function ChannelPage() {
  const [channelDetails, setChannelDetails] = useState<{
    channel: any;
    videos: Array<any>;
  }>();
  const [showingVideos, setShowingVideos] = useState<boolean>();

  const { channelid } = useParams();
  const router = useRouter();

  useEffect(() => {
    try {
      GetChannelDetails(Number(channelid)).then((res) => {
        if (res.error) {
          console.error(res.error);
          router.push("/home");
        } else {
          if (!res.channel) return;
          setChannelDetails({
            channel: res.channel.channel,
            videos: res.channel.videos,
          });
          console.log(res);
        }
      });
    } catch (error) {
      console.error(error);
      router.push("/home");
    }
  }, []);
  return (
    <div className="flex w-full">
      {channelDetails ? (
        <div className="w-full">
          <div className="flex justify-center items-center text-center">
            <ChannelNameHeader
              channelname={channelDetails.channel.channelname}
            />
          </div>
          <div className="flex flex-col justify-start ml-10 mb-3">
            <ChannelIcon iconUrl={channelDetails?.channel.channelprofile} />
            <h1 className="lg:text-md md:text-lg sm:text-lg flex">
              {channelDetails.channel.channeldesc}
            </h1>
          </div>
          <hr />
          <div className="flex ml-10 gap-x-10 mt-5 flex-col">
            <div className="flex justify-start">
              <h1 className="lg:text-3xl md:text-5xl sm:text-4xl flex gap-x-2 items-center">
                Videos
                <Link
                  href={`/channel/${channelid}/videos`}
                  className="lg:text-md md:text-lg sm:text-lg flex"
                >
                  See All
                </Link>
              </h1>
            </div>
            <div className="flex gap-x-10 mt-10">
              {channelDetails.videos.map((video) => (
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
          </div>
        </div>
      ) : (
        <Loader2Icon className="animate-spin justify-center flex items-center" />
      )}
    </div>
  );
}
