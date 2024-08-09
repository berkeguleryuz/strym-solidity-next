import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Clipboard,
  House,
  CloudLightning,
  User,
} from "lucide-react";
import Image from "next/image";

type Props = {};

const items = [
  {
    icon: <User className="h-8 w-8 text-orange-600" />,
    name: "Setup Your Profile",
    button: (
      <div className="text-orange-500 hover:translate-x-1 transition pt-6">
        Create your digital identity and get verified. After that, you can use
        and find it easily.
      </div>
    ),
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-orange-600" />,
    name: "Identity Verification ",
    button: (
      <div className="text-orange-500 hover:translate-x-1 transition pt-6">
        Submit identity ID and get verified by trusted third parties.
      </div>
    ),
  },
  {
    icon: <Clipboard className="h-8 w-8 text-orange-600" />,
    name: " Manage Your Profile",
    button: (
      <div className="text-orange-500 hover:translate-x-1 transition pt-6">
        Update personal details and manage your credentials easily.
      </div>
    ),
  },
  {
    icon: <CloudLightning className="h-8 w-8 text-orange-600" />,
    name: "Share Your Identity",
    button: (
      <div className="text-orange-500 hover:translate-x-1 transition pt-6">
        Share your verified digital identity securely with others and on all
        social media accounts.
      </div>
    ),
  },
];

const Section = (props: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl xl:text-4xl mt-6">
          Create, share, and manage your digital identity in one place.
        </div>
        <div className="text-orange-500 group flex items-center  hover:cursor-pointer pt-6">
          Learn How{" "}
          <ArrowRight className="ml-3 group-hover:rotate-90 transition duration-500 text-sm " />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={
              "border border-orange-300 bg-orange-50 p-4 rounded-lg flex flex-col items-center justify-between min-h-52 hover:shadow-2xl hover:shadow-orange-400 hover:bg-orange-100"
            }>
            <div className="justify-center items-center flex flex-col">
              {item.icon}
              <div className="text-lg font-medium mt-2">{item.name}</div>
              {item.button}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
