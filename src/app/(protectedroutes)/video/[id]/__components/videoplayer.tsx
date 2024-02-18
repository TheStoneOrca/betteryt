"use client";

import GetUserVideoTime from "@/app/actions/getusertimeforvideo";
import SaveVideoSession from "@/app/actions/savevideotime";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./progressbarstyle.css";

export default function VideoPlayer(props: {
  video: string;
  userid: number;
  videoid: number;
}) {
  const [videoPaused, setPaused] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>();
  const [progressMax, setProgressMax] = useState<number>(0);
  const [ready, setReady] = useState<boolean>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const saveFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!videoRef.current.duration) return;

    const video = videoRef.current;
    setProgressMax(video.duration);
  }, [videoRef.current?.duration]);

  useEffect(() => {
    const HandleWebpageLeave = (e: Event) => {
      e.preventDefault();
      SaveVideoTime();
    };

    try {
      GetUserVideoTime(props.userid, props.videoid).then((res) => {
        if (!videoRef.current) return;
        if (res.error) {
          console.error(res.error);
        } else {
          videoRef.current.currentTime = res.time;
        }
      });

      window.addEventListener("beforeunload", HandleWebpageLeave);
      setReady(true);
    } catch (error) {
      console.error(error);
    }

    return () => {
      window.removeEventListener("beforeunload", HandleWebpageLeave);
    };
  }, []);

  function SaveVideoTime() {
    if (!saveFormRef.current) return;

    saveFormRef.current.requestSubmit();
  }

  function PauseVideo() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.pause();

    setPaused(true);
    SaveVideoTime();
  }

  function UnPauseVideo() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.play();

    setPaused(false);
    SaveVideoTime();
  }

  function ProgressVideo(e: any) {
    setProgress(e.target.currentTime as any);
  }

  function ChangeProgress(e: any) {
    if (!progressRef.current) return;
    if (!videoRef.current) return;
    if (!saveFormRef.current) return;

    const progressBar = progressRef.current;

    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const width = progressBar.offsetWidth;
    const percentage = clickX / width;
    const newTime = percentage * progressMax;

    videoRef.current.currentTime = newTime;

    //@ts-ignore
    document.getElementById("videotime").value = newTime;
    SaveVideoTime();
  }

  function VideoEnd() {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    videoRef.current.pause();

    setPaused(true);
    SaveVideoTime();
  }

  function HandleVideoClick() {
    if (!videoRef.current) return;
    if (videoPaused === true) {
      videoRef.current.play();

      setPaused(false);
      SaveVideoTime();
    } else {
      videoRef.current.pause();

      setPaused(true);
      SaveVideoTime();
    }
  }

  return (
    <>
      {ready ? (
        <div>
          <div className="w-96">
            <video
              onClick={() => HandleVideoClick()}
              onEnded={() => VideoEnd()}
              ref={videoRef}
              id="video"
              width={750}
              onTimeUpdate={(e) => ProgressVideo(e as any)}
            >
              <source src={props.video} />
            </video>
            <div className="flex items-center mt-1">
              {videoPaused ? (
                <Button onClick={() => UnPauseVideo()}>
                  <Play />
                </Button>
              ) : (
                <Button onClick={() => PauseVideo()}>
                  <Pause />
                </Button>
              )}
              <progress
                className="w-full"
                max={progressMax}
                value={progress}
                ref={progressRef}
                onClick={(e) => ChangeProgress(e)}
              >
                Video Time
              </progress>
            </div>

            <form
              action={(e: any) => {
                console.log(progress);
                SaveVideoSession(e);
              }}
              ref={saveFormRef}
            >
              <input
                type="hidden"
                value={progress}
                name="videotime"
                id="videotime"
              />
              <input type="hidden" value={props.videoid} name="videoid" />
              <input type="hidden" value={props.userid} name="userid" />
            </form>
          </div>
        </div>
      ) : (
        <Loader2Icon className="flex justify-center items-center animate-spin" />
      )}
    </>
  );
}
