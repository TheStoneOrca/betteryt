"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Cards() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4">
        <Card className="dark:bg-black dark:text-white dark:border-black w-[332px]">
          <CardHeader>
            <CardTitle>Watch Videos</CardTitle>
            <CardContent>Watch amazing content!</CardContent>
          </CardHeader>
          <CardContent>
            <Button asChild className="dark:bg-white dark:text-black">
              <Link href="/home">Watch</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="w-[332px] dark:bg-black dark:text-white dark:border-black">
          <CardHeader>
            <CardTitle>Post Videos</CardTitle>
            <CardContent>Create videos for others to see!</CardContent>
          </CardHeader>
          <CardContent>
            <Button asChild className="dark:bg-white dark:text-black">
              <Link href="/post">Post</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-x-4 justify-center">
        <Card className="w-[332px] dark:bg-black dark:text-white dark:border-black">
          <CardHeader>
            <CardTitle>Earn Money</CardTitle>
            <CardContent>Earn money by posting.</CardContent>
          </CardHeader>
          <CardContent>
            <Button asChild className="dark:bg-white dark:text-black">
              <Link href="/studio">Earn</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
