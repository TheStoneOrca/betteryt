"use server";

import DbInit from "./actions/dbinit";

export async function GetUserByEmail(email: string) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    await db.end();

    if (user.rows.length > 0) {
      return { user: user.rows[0], isUser: true };
    } else {
      return { user: null, isUser: false };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function GetUserByUsername(username: string) {
  try {
    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    await db.end();

    if (user.rows.length > 0) {
      return { user: user.rows[0], isUser: true };
    } else {
      return { user: null, isUser: false };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
