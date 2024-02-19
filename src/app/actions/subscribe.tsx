"use server";

import DbInit from "./dbinit";

export default async function SubscribeToChannel(
  channelid: number,
  userid: number
) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    await db.query(
      "INSERT INTO subscribes(subscribingperson, subscribingto) VALUES($1, $2)",
      [userid, channelid]
    );

    await db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error!" };
  }
}
