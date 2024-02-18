"use server";

import DbInit from "./dbinit";

export default async function GetVideo(videoid: number) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const videos = await db.query(
      "SELECT * FROM videos JOIN channels ON channels.channelid = videos.videochannel WHERE videoid = $1",
      [videoid]
    );

    await db.end();

    return { success: true, video: videos.rows[0] };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
