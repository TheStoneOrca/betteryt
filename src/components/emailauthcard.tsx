"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AuthorizeEmailCode } from "@/app/actions/authorizecode";
import reactsecurestorage from "react-secure-storage";

export default function EmailAuthCard(props: { userid: number }) {
  const [error, setError] = useState<string>();

  return (
    <Card className="h-64">
      <CardHeader>
        <CardTitle>Check Your Email For The Access Code</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-5"
          action={(data) => {
            try {
              AuthorizeEmailCode(data).then((res) => {
                if (res.error) {
                  setError(res.error);
                } else {
                  reactsecurestorage.setItem(
                    "user_session",
                    res.userSession as string
                  );

                  window.location.href = "/home";
                }
              });
            } catch (error) {
              console.error(error);
              setError("Unexpected Server Error!");
            }
          }}
        >
          <div>
            <Label>Access Code</Label>
            <Input type="text" name="authtoken" />
          </div>

          <Input type="hidden" name="userid" value={props.userid} />

          <Button type="submit" className="w-full">
            Authorize
          </Button>

          {error && <Label>{error}</Label>}
        </form>
      </CardContent>
    </Card>
  );
}
