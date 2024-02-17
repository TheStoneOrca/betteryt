"use client";

import CreateVideo from "@/app/actions/createvideo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VideoForm(props: { channelid: number }) {
  const [error, setError] = useState<string>();

  const router = useRouter();
  return (
    <Card className="dark:bg-black dark:border-black dark:text-white text-black bg-white border-white w-84">
      <CardHeader>
        <CardTitle>Post The Video That Will Change Your Life!</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-3"
          action={(data) =>
            CreateVideo(data).then((res) => {
              try {
                if (res.error) {
                  setError(
                    "Unexpected Error While Creating Video, please try again...."
                  );
                } else {
                  router.push("/home");
                }
              } catch (error) {
                console.error(error);
                setError(
                  "Unexpected Error While Creating Video, please try again...."
                );
              }
            })
          }
        >
          <div>
            <Label>Video Title</Label>
            <Input type="text" name="videotitle" />
          </div>
          <div>
            <Label>Video Description</Label>
            <Input type="text" name="videodesc" />
          </div>
          <div>
            <Label>Video Thumbnail</Label>
            <Input type="file" name="videothumbnail" accept=".png, .jpg" />
          </div>
          <div>
            <Label>Video File</Label>
            <Input type="file" name="videofile" accept=".mov, .mp4" />
          </div>
          <Input type="hidden" value={props.channelid} name="channelid" />

          <Button type="submit">Post</Button>

          {error && <h1>{error}</h1>}
        </form>
      </CardContent>
    </Card>
  );
}
