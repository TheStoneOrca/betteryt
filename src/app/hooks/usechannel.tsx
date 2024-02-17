"use client";

import { useEffect, useState } from "react";
import reactsecurestorage from "react-secure-storage";
import GetChannelSession from "../actions/getchannelsession";

type Channel = {
  channelid: number;
  channelname: string;
  channeldesc: string;
  channelcreator: string;
  channelprofile: string;
};

type ChannelHook = {
  isReady: boolean;
  isInAChannel: boolean;
  channel: Channel | null;
  error: boolean;
};

export default function useChannel() {
  const [userHookDetails, setHookDetails] = useState<ChannelHook>({
    isReady: false,
    isInAChannel: false,
    channel: null,
    error: false,
  });
  useEffect(() => {
    try {
      if (reactsecurestorage.getItem("channel_session") === null) {
        setHookDetails({
          isReady: true,
          isInAChannel: false,
          channel: null,
          error: false,
        });
      } else {
        GetChannelSession(
          reactsecurestorage.getItem("channel_session") as string
        ).then((res) => {
          if (res.error || !res.channel || !res.success) {
            setHookDetails({
              isReady: true,
              isInAChannel: false,
              channel: null,
              error: false,
            });
          } else {
            setHookDetails({
              isReady: true,
              isInAChannel: true,
              channel: res.channel as Channel,
              error: false,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      setHookDetails({
        isReady: true,
        isInAChannel: false,
        channel: null,
        error: true,
      });
    }
  }, []);

  return userHookDetails;
}
