"use server";

import DbInit from "./dbinit";

export default async function CreateVideo(data: FormData) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const videoThumbnailData = new FormData();
    videoThumbnailData.append("file", data.get("videothumbnail") as string);
    videoThumbnailData.append("upload_preset", "n3gm5qgo");

    const videoFileFormData = new FormData();
    videoFileFormData.append("file", data.get("videofile") as string);
    videoFileFormData.append("upload_preset", "n3gm5qgo");

    const videoThumbnailFetch = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/image/upload",
      {
        method: "POST",
        body: videoThumbnailData,
      }
    );

    const videoFileFetch = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/video/upload",
      {
        method: "POST",
        body: videoFileFormData,
      }
    );

    const videoThumbnail = await videoThumbnailFetch.json();
    const videoFile = await videoFileFetch.json();

    await db.query(
      "INSERT INTO videos(videotitle, videodesc, videofile, videothumbnail, videochannel, datecreated, views) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [
        data.get("videotitle"),
        data.get("videodesc"),
        videoFile.secure_url,
        videoThumbnail.secure_url,
        data.get("channelid"),
        new Date(),
        0,
      ]
    );

    await db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
