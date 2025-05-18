"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { logout } from "@/lib/actions/user.actions";

const list = [
  { id: 1, name: "Home", link: "/" },
  // { id: 2, name: "About", link: "/about" },
  { id: 3, name: "Events", link: "/events" },
  { id: 4, name: "My Events", link: "/myevents" },
];

const Navbar = () => {

    const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);


  const handleClick = async () => {
    await logout(); // This should also remove token from localStorage
    localStorage.removeItem("token"); // Explicitly remove token on logout
    setToken(null); // Update state
  };
  return (
    <nav className="flex flex-col justify-center items-center w-full pt-12 text-black">
      <div className="w-[400px] lg:w-[500px] bg-white rounded-full flex flex-row justify-between items-center pr-10  shadow-2xl/60 shadow-primary">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            width={50}
            height={50}
            alt="logo"
            className="object-contain hover:animate-spin transition-transform duration-700 cursor-pointer"
          />
        </Link>

        {list.map((allList) => (
          <Link href={allList.link} key={allList.id}>
            <h1 className="text-sm md:text-md relative cursor-pointer  before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-[#3B82F6] before:transition-all before:duration-300 hover:before:w-full">
              {allList.name}
            </h1>
          </Link>
        ))}
        <Button
          variant="link"
          className="hover:no-underline p-0 m-0 bg-transparent inline-flex items-center"
          onClick={token ? handleClick : undefined}
        >
          {token ? (
            <Link href="/">
              <h1 className="text-sm md:text-md text-destructive font-bold relative cursor-pointer  before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-[#efda20] before:transition-all before:duration-300 hover:before:w-full">
                logout
              </h1>
            </Link>
          ) : (
            <Link href="/sign-in">
              <h1 className="text-md text-primary relative cursor-pointer  before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-[#efda20] before:transition-all before:duration-300 hover:before:w-full">
                Sign In
              </h1>
            </Link>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
