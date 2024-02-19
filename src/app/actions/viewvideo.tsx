"use server";

import DbInit from "./dbinit";

export default async function AddVideoView(videoid: number) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    await db.query("UPDATE videos SET views = views + 1");

    await db.end();

    return { success: true };
  } catch (error) {
    return { error: error };
  }
}
