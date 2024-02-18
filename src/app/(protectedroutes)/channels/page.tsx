"use client";

import GetUsersChannels from "@/app/actions/getalluserchannels";
import useChannel from "@/app/hooks/usechannel";
import useUser from "@/app/hooks/useuserhook";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import ChannelCard from "./__components/channelcard";

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Array<any>>();
  const { isLoaded, user } = useUser();
  const { isReady, channel, isInAChannel } = useChannel();

  useEffect(() => {
    if (!isLoaded || !user) return;

    try {
      GetUsersChannels(user.userid).then((res) => {
        if (res.error) {
          setChannels([]);
        } else {
          setChannels(res.channels);
        }
      });
    } catch (error) {
      console.error(error);
      setChannels([]);
    }
  }, [isLoaded]);

  return (
    <div className="flex w-full">
      {channels && isReady ? (
        <div className="ml-10 mt-5 flex gap-x-10">
          {channels.map((channelDetails) => (
            <ChannelCard
              channeldescription={channelDetails.channeldesc}
              channelid={channelDetails.channelid}
              channelname={channelDetails.channelname}
              channelprofile={channelDetails.channelprofile}
              currentchannel={
                isInAChannel && channel ? channel.channelid : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full justify-center items-center">
          <Loader2Icon className="animate-spin w-72 h-72" />
        </div>
      )}
    </div>
  );
}
