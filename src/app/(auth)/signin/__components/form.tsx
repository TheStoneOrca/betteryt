"use client";

import SignIn from "@/app/actions/signin";
import EmailAuthCard from "@/components/emailauthcard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useState } from "react";

export default function SignUpForm() {
  const [showAccessCodeCard, setShowingCard] = useState<boolean>();
  const [userid, setUserId] = useState<number>();
  const [showPassword, setShowing] = useState<boolean>();
  const [password, setPassword] = useState<string>();

  return (
    <div className="w-full">
      {showAccessCodeCard && userid && (
        <div className="flex justify-center items-center">
          <EmailAuthCard userid={userid} />
        </div>
      )}
      <div
        className={cn(
          "w-full h-full flex justify-center",
          showAccessCodeCard && userid && "hidden"
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardContent>Gain Your Access Back To The Best Website</CardContent>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-y-3"
              action={(data) => {
                SignIn(data).then((res) => {
                  if (res.success) {
                    setShowingCard(true);
                    setUserId(res.userid);
                  }
                });
              }}
            >
              <div className="flex flex-col gap-y-2">
                <Label>Username or Email</Label>
                <Input
                  className="invalid:border-destructive"
                  type="text"
                  name="username"
                  placeholder="CocoGod"
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Password</Label>
                <div className="flex">
                  {showPassword ? (
                    <Input
                      className="invalid:border-destructive"
                      type="text"
                      name="password"
                      placeholder="********"
                      value={password}
                      onInput={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                      minLength={8}
                      required
                    />
                  ) : (
                    <Input
                      className="invalid:border-destructive"
                      type="password"
                      name="password"
                      placeholder="********"
                      value={password}
                      onInput={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                      minLength={8}
                      required
                    />
                  )}
                  <Button onClick={() => setShowing(!showPassword)}>
                    <Eye />
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
