"use server";

import DbInit from "./dbinit";

export default async function GetAllChannelVideos(channelid: number) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const videos = await db.query(
      "SELECT * FROM videos JOIN channels ON channels.channelid = videos.videochannel WHERE videochannel = $1",
      [channelid]
    );

    await db.end();

    return { success: true, videos: videos.rows };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
