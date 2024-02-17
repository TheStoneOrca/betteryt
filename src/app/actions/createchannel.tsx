"use server";

import jwt from "jsonwebtoken";
import DbInit from "./dbinit";

export default async function CreateChannel(data: FormData) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    const checkChannelName = await db.query(
      "SELECT * FROM channels WHERE channelname = $1",
      [data.get("channelname")]
    );

    if (checkChannelName.rows.length > 0) {
      return { error: "Channel Name Already Found" };
    }

    const channelProfileData = new FormData();
    channelProfileData.append("file", data.get("channelprofile") as string);
    channelProfileData.append("upload_preset", "n3gm5qgo");

    const profileDataFetch = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/image/upload",
      {
        method: "POST",
        body: channelProfileData,
      }
    );

    const profile = await profileDataFetch.json();

    const channel = await db.query(
      "INSERT INTO channels(channelname, channeldesc, channelprofile, channelcreator) VALUES($1, $2, $3, $4) RETURNING *",
      [
        data.get("channelname"),
        data.get("channeldesc"),
        profile.secure_url,
        data.get("userid"),
      ]
    );

    await db.end();

    const channelSession = jwt.sign(
      channel.rows[0],
      process.env.JWT_SECRET as string
    );

    console.log(channelSession, channel.rows[0]);

    return {
      success: true,
      channelSession: channelSession,
      channelId: channel.rows[0].channelid,
    };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
