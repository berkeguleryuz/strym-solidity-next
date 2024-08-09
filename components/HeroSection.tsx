"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Badge,
  Briefcase,
  Lock,
  LockIcon,
  NetworkIcon,
  Share,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

type Props = {};

const tabs = [
  {
    icon: <NetworkIcon className="h-8 w-8 mr-3 rounded-md" />,
    name: "Create Your Digital ID",
    description: "Get your digital ID and share it with anyone.",
    more: (
      <div className="text-orange-600 flex items-center">
        Learn more... <ArrowRight className="rounded-full bg ml-1 text-sm" />
      </div>
    ),
    images: "/1.jpg",
  },
  {
    icon: <Share className="h-8 w-8 mr-3 rounded-md" />,
    name: "Share Your Digital ID",
    description: "Create a digital ID and share it with anyone.",
    more: (
      <div className="text-orange-600 flex items-center">
        Learn more... <ArrowRight className="ml-1 text-sm" />
      </div>
    ),
    images: "/2.jpg",
  },
  {
    icon: <LockIcon className="h-8 w-8 mr-3 rounded-md" />,
    name: "Privacy & Security",
    description: "Control who can see your data.",
    more: (
      <div className="text-orange-600 flex items-center">
        Learn more... <ArrowRight className="ml-1 text-sm" />
      </div>
    ),
    images: "/3.jpg",
  },
  {
    icon: <Briefcase className="h-8 w-8 mr-3  rounded-md" />,
    name: "Find Jobs with ID",
    description: "You can find jobs with your digital ID.",
    more: (
      <div className="text-orange-600 flex items-center">
        Learn more... <ArrowRight className="ml-1 text-sm" />
      </div>
    ),
    images: "/4.jpg",
  },
];

const HeroSection = (props: Props) => {
  const ref = useRef(null);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  return (
    <div className="w-full h-full space-y-5 items-center flex flex-col">
      <div className="font-medium 2xl:w-1/3 md:w-2/3 xl:w1/2 lg:px-0 px-8 text-3xl xl:text-4xl flex justify-center xl:font-medium  text-center">
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
      {/* Burayı kesin değiştir */}
      {/* <div className="w-full items-center">
        {isSmallScreen ? (
          <div className="md:grid-cols-1 grid sm:grid-cols-2 place-content-center place-items-center mx-auto space-x-0  xl:space-x-4 items-center justify-center hover:cursor-pointer gap-4 w-full h-full">
            {tabs.map((tab) => (
              <motion.div
                key={tab.name}
                className={`xl:flex justify-center  xl:my-0 w-full h-full ${
                  activeTab === tab
                    ? "border-2 border-dashed rounded-xl pt-2 bg-gradient-to-tr from-neutral-200 to-neutral-400 "
                    : "border-2 border-dashed shadow-md rounded-xl pt-2 bg-gradient-to-tr from-neutral-700 to-neutral-950 text-white"
                }`}
                onMouseEnter={() => setActiveTab(tab)}>
                <div className="px-4 min-h-40 items-center flex justify-center flex-col">
                  <div className="flex items-center">
                    <div>{tab.icon}</div>
                    <div className="text-2xl font-medium">{tab.name}</div>
                  </div>
                  <motion.div
                    className="flex flex-col text-sm"
                    initial={{ y: 0 }}
                    animate={{ y: activeTab === tab ? 18 : 25 }}
                    transition={{ duration: 0.2 }}>
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>
                        {tab.description}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex xl:space-x-4 items-center justify-between hover:cursor-pointer gap-4 ">
            {tabs.map((tab) => (
              <motion.div
                key={tab.name}
                className={`xl:flex justify-center space-x-4 xl:pt-4 sm:my-10 xl:my-0 w-60 h-40 ${
                  activeTab === tab
                    ? "border-2 border-dashed rounded-xl pt-2 bg-gradient-to-tr from-neutral-200 to-neutral-400 "
                    : "border-2 border-dashed shadow-md rounded-xl pt-2 bg-gradient-to-tr from-neutral-700 to-neutral-950 text-white"
                }
            `}
                onMouseEnter={() => setActiveTab(tab)}>
                <div className="px-4">
                  <div className="flex items-center">
                    <div className="">{tab.icon}</div>
                    <div className="text-xl font-medium">{tab.name}</div>
                  </div>

                  <motion.div
                    className="flex flex-col text-sm"
                    initial={{ y: 0 }}
                    animate={{ y: activeTab === tab ? 15 : 25 }}
                    transition={{ duration: 0.2 }}>
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}>
                        {tab.description}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default HeroSection;
