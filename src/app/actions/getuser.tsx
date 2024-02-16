"use server";

import jwt from "jsonwebtoken";

export default async function GetUser(sessiontoken: string) {
  try {
    const user = jwt.verify(sessiontoken, process.env.JWT_SECRET as string);

    return { success: true, user: user };
  } catch (error) {
    return { error: error };
  }
}
