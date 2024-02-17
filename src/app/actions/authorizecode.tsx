"use server";

import DbInit from "./dbinit";
import jwt from "jsonwebtoken";

export async function AuthorizeEmailCode(data: FormData) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    const isAuthToken = await db.query(
      "SELECT * FROM emailauthtokens WHERE tokenkey = $1 AND tokenfor = $2",
      [data.get("authtoken"), data.get("userid")]
    );

    if (isAuthToken.rows.length <= 0) {
      return { error: "Auth Token Does Not Exist!" };
    }

    const userDetails = await db.query(
      "SELECT userid, username, email, fname, lname FROM users WHERE userid = $1",
      [data.get("userid")]
    );

    await db.query("DELETE FROM emailauthtokens WHERE tokenid = $1", [
      isAuthToken.rows[0].tokenid,
    ]);

    await db.end();

    const userJWT = jwt.sign(
      userDetails.rows[0],
      process.env.JWT_SECRET as string
    );

    return { success: true, userSession: userJWT };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Issue" };
  }
}
