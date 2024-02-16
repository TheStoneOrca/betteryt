"use server";

import { GetUserByEmail, GetUserByUsername } from "../getuser";
import DbInit from "./dbinit";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export default async function SignIn(data: FormData) {
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

    let user;

    if (isUsername.isUser) {
      user = isUsername.user;
    } else if (isEmail.isUser) {
      user = isEmail.user;
    } else {
      return { error: "User does not exist!" };
    }

    const checkPassword = await bcrypt.compare(
      data.get("password") as string,
      user.password
    );

    if (checkPassword) {
      const authtoken = uuidv4();

      await db.query(
        "INSERT INTO emailauthtokens(tokenkey, tokenfor) VALUES($1, $2)",
        [authtoken, user.userid]
      );

      await transporter.sendMail({
        from: process.env.email,
        to: user.email,
        subject: "User Authorization Key For Signup",
        text: authtoken,
      });

      await db.end();

      return { success: true, userid: user.userid };
    } else {
      return { error: "Invalid username or password!" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Issue" };
  }
}
