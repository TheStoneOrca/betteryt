"use client";

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

export default function SignUpForm() {
  return (
    <div>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create An Account for CocoTube!</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="CocoGod"
                minLength={3}
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="********"
                minLength={8}
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="CocoNugget@gmail.com"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>First Name</Label>
              <Input type="text" name="fname" placeholder="Coco" required />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Last Name</Label>
              <Input type="text" name="lname" placeholder="Nugget" required />
            </div>

            <Button type="submit">Create Account</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
