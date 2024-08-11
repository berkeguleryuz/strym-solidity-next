import Image from "next/image";
import Link from "next/link";
import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiTwitterLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";

const Footer = () => {
  return (
    <div className=" flex lg:items-center pb-10 flex-col mt-5 mx-auto border-t border-black ">
      <div className="lg:flex  lg:space-x-32 md:px-0 ">
        <div className="items-center justify-center flex">
          <Link
            className="hover:scale-105 hover:opacity-80 transition-all"
            href={"/"}>
            <Image src="/logo.png" alt="logo" width={140} height={40} />
          </Link>
        </div>

        <div className="flex-col space-y-6 ">
          <div className="pt-10 font-medium">Use Cases</div>
          <div className="font-light space-y-4 text-sm">
            <div>Home</div>
            <div>Onboard</div>
            <div>Verify</div>
          </div>
        </div>

        <div className="flex-col space-y-6 flex ">
          <div className="pt-10 font-medium">Process</div>
          <div className="font-light space-y-4 text-sm">
            <div>Choose Digital Identity</div>
            <div>Manage Your Profile</div>

            <div>Create ID</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
