"use client";

import Signup from "@/app/actions/signup";
import EmailAuthCard from "@/components/emailauthcard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create An Account for CocoTube!</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-y-5"
              action={(data) => {
                try {
                  Signup(data).then((res) => {
                    if (res.success) {
                      setShowingCard(true);
                      setUserId(res.userid);
                    }
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-y-2 w-36">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="fname"
                      placeholder="Coco"
                      required
                      className="invalid:border-destructive"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 w-36">
                    <Label>Last Name</Label>
                    <Input
                      className="invalid:border-destructive"
                      type="text"
                      name="lname"
                      placeholder="Nugget"
                      required
                    />
                  </div>
                </div>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="CocoGod"
                  className="invalid:border-destructive"
                  minLength={3}
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
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  className="invalid:border-destructive"
                  type="email"
                  name="email"
                  placeholder="CocoNugget@gmail.com"
                  required
                />
              </div>

              <Button type="submit">Create Account</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
