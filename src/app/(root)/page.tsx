import Image from "next/image";
import Header from "./__components/header";
import { Fredoka } from "next/font/google";
import { cn } from "@/lib/utils";
import ContinueButton from "./__components/continuebtn";
import Cards from "./__components/cards";
const fredoka = Fredoka({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  return (
    <div className={cn("flex flex-col min-h-screen", fredoka.className)}>
      <div className="flex-grow justify-center mt-1 ml-1">
        <div className="mb-5">
          <Header />
        </div>
        <div className="flex justify-center mt-32">
          <Cards />
        </div>
        <div className="flex justify-center mt-2">
          <h1 className="lg:text-md md:text-lg sm:text-lg">
            This Website Fits Your Every needs
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <ContinueButton />
      </div>
      <div className="mt-24" />
    </div>
  );
}
