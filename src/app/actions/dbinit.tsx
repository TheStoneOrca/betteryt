"use server";

import pg from "pg";

export default async function DbInit() {
  try {
    const db = new pg.Client({
      connectionString: process.env.DB_CONNECTION_STRING,
    });

    await db.connect();

    return { db: db };
  } catch (error) {
    return { error: error };
  }
}
