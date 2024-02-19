"use server";

import DbInit from "./dbinit";

export default async function CheckIfSubbed(userid: number, channelid: number) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    const checkIfSubbed = await db.query(
      "SELECT * FROM subscribes WHERE subscribingperson = $1 AND subscribingto = $2",
      [userid, channelid]
    );

    await db.end();

    if (checkIfSubbed.rows.length > 0) {
      return { success: true, subbed: true };
    } else {
      return { success: false, subbed: false };
    }
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error!" };
  }
}
