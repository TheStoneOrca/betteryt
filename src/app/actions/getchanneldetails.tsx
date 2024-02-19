"use server";

import DbInit from "./dbinit";

export default async function GetChannelDetails(channelid: number) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const channel = await db.query(
      "SELECT * FROM channels WHERE channelid = $1",
      [channelid]
    );

    const videos = await db.query(
      "SELECT * FROM videos JOIN channels ON channels.channelid = videos.videochannel WHERE videochannel = $1 LIMIT 10",
      [channelid]
    );

    const subscribes = await db.query(
      "SELECT * FROM subscribes WHERE subscribingto = $1",
      [channelid]
    );

    await db.end();

    return {
      success: true,
      channel: {
        channel: channel.rows[0],
        videos: videos.rows,
        subscribes: subscribes.rows.length,
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
