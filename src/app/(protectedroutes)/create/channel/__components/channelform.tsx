"use client";

import CreateChannel from "@/app/actions/createchannel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import reactsecurestorage from "react-secure-storage";

export default function CreateChannelForm(props: { userid: number }) {
  const router = useRouter();

  return (
    <div>
      <Card className=" dark:bg-black dark:border-black dark:text-white">
        <CardHeader>
          <CardTitle>Create Your Channel!</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-y-2"
            action={(data) => {
              try {
                CreateChannel(data).then((res) => {
                  if (res.error) {
                    console.log(res.error);
                  } else {
                    reactsecurestorage.setItem(
                      "channel_session",
                      res.channelSession as any
                    );
                    router.push(`/channel/${res.channelId}`);
                  }
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <div>
              <Label>Channel Name</Label>
              <Input type="text" name="channelname" required />
            </div>
            <div>
              <Label>Channel Description</Label>
              <Input type="text" name="channeldesc" required />
            </div>
            <div>
              <Label>Channel Profile</Label>
              <Input
                type="file"
                name="channelprofile"
                accept=".png, .jpg"
                required
              />
            </div>

            <Input type="hidden" name="userid" value={props.userid} />

            <Button type="submit" className="mt-2">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
