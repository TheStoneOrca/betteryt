"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SubscribeToChannel from "@/app/actions/subscribe";
import UnSubscribeToChannel from "@/app/actions/unsubscribe";

type SubscribeButtonProps = {
  channelid: number;
  userid: number;
  alreadySubscribed: boolean;
  subscribes: number;
};

export default function SubscribeButton({
  alreadySubscribed,
  channelid,
  userid,
  subscribes,
}: SubscribeButtonProps) {
  const [subbed, setSubbed] = useState<boolean>(false);
  const [subscribers, setSubscribers] = useState<number>(0);

  useEffect(() => {
    if (alreadySubscribed === true) {
      setSubbed(true);
    } else {
      setSubbed(false);
    }
    setSubscribers(subscribes);
  }, [alreadySubscribed]);

  return (
    <>
      {subbed ? (
        <Button
          onClick={() => {
            try {
              UnSubscribeToChannel(channelid, userid).then((res) => {
                if (res.error) {
                  console.error(res.error);
                } else {
                  setSubbed(false);
                  setSubscribers((subs) => subs - 1);
                }
              });
            } catch (error) {
              console.error(error);
            }
          }}
          className="flex-col gap-y-2 h-12"
        >
          <div className="flex">{subscribers} Subscribers</div> Subscribed
        </Button>
      ) : (
        <Button
          onClick={() => {
            try {
              SubscribeToChannel(channelid, userid).then((res) => {
                if (res.error) {
                  console.error(res.error);
                } else {
                  setSubbed(true);
                  setSubscribers((subs) => subs + 1);
                }
              });
            } catch (error) {
              console.error(error);
            }
          }}
          className="flex-col gap-y-2 h-12"
        >
          <div className="flex">{subscribers} Subscribers</div> Subscribe
        </Button>
      )}
    </>
  );
}
