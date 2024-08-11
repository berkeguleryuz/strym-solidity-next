"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { XSquare, AlignCenter } from "lucide-react";
import { getUserByAddress } from "@/lib/queries";
import NavDropdownMenu from "./NavDropdownMenu";

type Props = {};

const Nav = (props: Props) => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const toggleDropdown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const closeDropdown = () => {
    setIsDropDownVisible(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      let userInfo = (await getUserByAddress(
        ready ? wallets[0]?.address : "0x0",
      )) as any;

      setUserInfo(userInfo);
    };
    getUserInfo();
  }, [ready, authenticated, wallets]);
  return (
    <div className="flex items-center justify-between space-x-10 bg-white h-14 sticky top-0 z-50 border-b border-gray-400">
      <div className="flex items-center justify-center">
        <Link className="p-6" href={"/"}>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={125}
            height={125}
            className="hover:scale-105 duration-300"
          />
        </Link>
        {/* Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={"/"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href={"/verify"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Verify Persona
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Actions */}
      <div className="pr-2">
        <div className="items-center justify-center flex">
          <div className="flex xl:space-x-4">
            {authenticated && userInfo != "User does not exist" ? (
              <div>
                <Link
                  href={"/dashboard"}
                  className="lg:flex items-center hidden">
                  <div className="">Dashboard</div>
                  <div className="font-thin lg:flex ml-4 mr-0 items-center hidden">
                    |
                  </div>
                </Link>
              </div>
            ) : authenticated && userInfo == "User does not exist" ? (
              <div>
                <Link href={"/onboard"} className="lg:flex items-center hidden">
                  <div className="">Get Started</div>
                </Link>

                <div className="font-thin lg:flex ml-4 mr-0 items-center hidden">
                  |
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex lg:space-x-2 items-center pr-4">
            {authenticated ? (
              <Link href={"/onboard"}>
                <Button
                  variant={"outline"}
                  className="lg:flex items-center hidden border-none text-base">
                  Get Started
                </Button>
              </Link>
            ) : (
              ""
            )}
            {authenticated ? (
              <Button className="hidden lg:block" onClick={logout}>
                Disconnect
              </Button>
            ) : (
              <Button className="hidden lg:block" onClick={login}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
        {isDropDownVisible && (
          <div className="rounded-full xl:hidden" onClick={toggleDropdown}>
            <XSquare className="h-5 w-5 items-center justify-center rounded-full" />
          </div>
        )}
        {!isDropDownVisible && (
          <div onClick={toggleDropdown} className="flex lg:hidden">
            <AlignCenter className="h-6 w-6 items-center justify-center rounded-full" />
          </div>
        )}
        {isDropDownVisible && <NavDropdownMenu onClose={closeDropdown} />}
      </div>
    </div>
  );
};

export default Nav;
