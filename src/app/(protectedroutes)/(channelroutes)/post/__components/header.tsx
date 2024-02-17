"use client";

import { Check } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col gap-y-2 justify-center text-center items-center">
      <h1 className="lg:text-3xl md:text-5xl sm:text-4xl flex gap-x-2 items-center">
        Post A Video <Check />
      </h1>
      <h4 className="lg:text-md md:text-lg sm:text-lg flex">
        Next Step Is To Become Famous!
      </h4>
    </div>
  );
}
