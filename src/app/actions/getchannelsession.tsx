"use server";

import jwt from "jsonwebtoken";

export default async function GetChannelSession(sessiontoken: string) {
  try {
    const channel = jwt.verify(sessiontoken, process.env.JWT_SECRET as string);
    return { success: true, channel: channel };
  } catch (error) {
    return { error: error };
  }
}
