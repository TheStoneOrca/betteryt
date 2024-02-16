"use client";

import { useEffect, useState } from "react";
import reactsecurestorage from "react-secure-storage";
import GetUser from "../actions/getuser";

type User = {
  userid: number;
  username: string;
  email: string;
  fname: string;
  lname: string;
};

type UserHook = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: User | null;
  error: boolean;
};

export default function GetUserHook() {
  const [userHookDetails, setHookDetails] = useState<UserHook>({
    isLoaded: false,
    isSignedIn: false,
    user: null,
    error: false,
  });
  useEffect(() => {
    try {
      if (reactsecurestorage.getItem("user_session") === null) {
        setHookDetails({
          isLoaded: true,
          isSignedIn: false,
          user: null,
          error: false,
        });
      } else {
        GetUser(reactsecurestorage.getItem("user_session") as string).then(
          (res) => {
            if (res.error || !res.user || !res.success) {
              setHookDetails({
                isLoaded: true,
                isSignedIn: false,
                user: null,
                error: true,
              });
            } else {
              setHookDetails({
                isLoaded: true,
                isSignedIn: true,
                user: res.user as User,
                error: false,
              });
            }
          }
        );
      }
    } catch (error) {
      console.error(error);
      setHookDetails({
        isLoaded: true,
        isSignedIn: false,
        user: null,
        error: true,
      });
    }
  }, []);

  return userHookDetails;
}
