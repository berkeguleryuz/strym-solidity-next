"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  LockIcon,
  NetworkIcon,
  Share,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};


const HeroSection = (props: Props) => {
  return (
    <div className="w-full h-full space-y-5 items-center flex flex-col">
      <div className="font-medium flex flex-col 2xl:w-1/3 md:w-2/3 xl:w1/2 lg:px-0 px-8 text-3xl xl:text-4xl justify-center xl:font-medium  text-center">
        <h1 className="text-6xl text-lime-500">- Beta -</h1>
        <h1>Your ID. Your privacy.</h1>
      </div>
      <p className="text-2xl pt-4 text-center w-2/3 mx-auto"></p>
      Create once, share everywhere.
      <span className="border-b border-double border-orange-500 py-2 bg-gradient-to-r text-transparent bg-clip-text from-orange-300 to-orange-500 gradient-text text-3xl font-bold">
        Clodron Star ID
      </span>
      <div className="flex gap-4 items-center justify-center group">
        <Link href={"/"}>
          <Button className="py-1">
            <div className="flex items-center justify-center">
              <h2 className="text-lg">Create Digital ID</h2>
              <div>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:rotate-90 group-hover:transform transition duration-300" />
              </div>
            </div>
          </Button>
        </Link>
      </div>
      <div className="items-center justify-center">
        <Image
          src={"/13.jpg"}
          width={333}
          height={333}
          alt="hero image"
          className="mx-auto rounded-xl shadow-md shadow-black object-contain w-full h-full"
        />
      </div>
    </div>
  );
};

export default HeroSection;
