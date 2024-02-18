"use server";

import DbInit from "./dbinit";

export default async function GetUserVideoTime(
  userid: number,
  videoid: number
) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const time = await db.query(
      "SELECT * FROM videosessions WHERE sessionvideo = $1 AND sessionowner = $2",
      [videoid, userid]
    );

    await db.end();

    if (time.rows.length > 0) {
      return { success: true, time: time.rows[0].sessiontime };
    } else {
      return { success: true, time: 0 };
    }
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
