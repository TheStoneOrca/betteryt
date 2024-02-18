"use server";

import DbInit from "./dbinit";

export default async function SaveVideoSession(data: FormData) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }

    const db = database.db;

    const checkIfSession = await db.query(
      "SELECT * FROM videosessions WHERE sessionvideo = $1 AND sessionowner = $2",
      [data.get("videoid"), data.get("userid")]
    );

    if (checkIfSession.rows.length > 0) {
      await db.query(
        "UPDATE videosessions SET sessiontime = $1 WHERE sessionvideo = $2 AND sessionowner = $3",
        [data.get("videotime"), data.get("videoid"), data.get("userid")]
      );
    } else {
      await db.query(
        "INSERT INTO videosessions(sessiontime, sessionvideo, sessionowner) VALUES($1, $2, $3)",
        [data.get("videotime"), data.get("videoid"), data.get("userid")]
      );
    }

    await db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
