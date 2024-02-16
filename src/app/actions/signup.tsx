"use server";

import { GetUserByEmail, GetUserByUsername } from "../getuser";
import DbInit from "./dbinit";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export default async function Signup(data: FormData) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.emailpass,
      },
    });

    const database = await DbInit();

    if (database.error || !database.db) {
      throw Error("Unexpected Server Error!");
    }
    const db = database.db;

    const isEmail = await GetUserByEmail(data.get("email") as string);
    const isUsername = await GetUserByUsername(data.get("username") as string);

    if (isUsername.isUser === true || isEmail.isUser === true) {
      return { error: "Username or Email already registered!" };
    }

    const hashedPassword = await bcrypt.hash(
      data.get("password") as string,
      10
    );

    const user = await db.query(
      "INSERT INTO users(username, password, email, fname, lname) VALUES($1, $2, $3, $4, $5) RETURNING userid",
      [
        data.get("username"),
        hashedPassword,
        data.get("email"),
        data.get("fname"),
        data.get("lname"),
      ]
    );

    const authtoken = uuidv4();

    await db.query(
      "INSERT INTO emailauthtokens(tokenkey, tokenfor) VALUES($1, $2)",
      [authtoken, user.rows[0].userid]
    );

    await transporter.sendMail({
      from: process.env.email,
      to: data.get("email") as string,
      subject: "User Authorization Key For Signup",
      text: authtoken,
    });

    await db.end();

    return { success: true, userid: user.rows[0].userid };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Issue" };
  }
}
