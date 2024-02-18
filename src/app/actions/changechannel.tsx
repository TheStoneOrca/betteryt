"use server";

import jwt from "jsonwebtoken";
import DbInit from "./dbinit";

export default async function ChangeChannel(channelid: number) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    const channelDetails = await db.query(
      "SELECT * FROM channels WHERE channelid = $1",
      [channelid]
    );

    const channel = jwt.sign(
      channelDetails.rows[0],
      process.env.JWT_SECRET as string
    );

    return { success: true, channelSession: channel };
  } catch (error) {
    return { error: error };
  }
}
