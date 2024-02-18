"use client";

import ChangeChannel from "@/app/actions/changechannel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import reactsecurestorage from "react-secure-storage";

export default function ChannelCard(props: {
  channelname: string;
  channelid: number;
  channelprofile: string;
  channeldescription: string;
  currentchannel?: number;
}) {
  return (
    <Card className="w-64 h-96 dark:bg-black dark:text-white text-black bg-white dark:border-black border-white">
      <CardHeader>
        <CardTitle>{props.channelname}</CardTitle>
        <CardDescription>{props.channeldescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <img src={props.channelprofile} alt="channelprofile" />
        {props.channelid === props.currentchannel ? (
          <Button variant="secondary">Active Channel</Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              try {
                ChangeChannel(props.channelid).then((res) => {
                  if (res.error) {
                    console.error(res.error);
                  } else {
                    reactsecurestorage.setItem(
                      "channel_session",
                      res.channelSession as any
                    );
                    window.location.reload();
                  }
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Switch To
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
