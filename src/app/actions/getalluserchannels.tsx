"use server";

import DbInit from "./dbinit";

export default async function GetUsersChannels(userid: number) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const channels = await db.query(
      "SELECT * FROM channels WHERE channelcreator = $1",
      [userid]
    );

    await db.end();

    return { success: true, channels: channels.rows };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
