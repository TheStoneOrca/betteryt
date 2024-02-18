"use server";

import DbInit from "./dbinit";

export default async function GetAllVideos() {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const videos = await db.query(
      "SELECT * FROM videos JOIN channels ON channels.channelid = videos.videochannel"
    );

    await db.end();

    return { success: true, videos: videos.rows };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
