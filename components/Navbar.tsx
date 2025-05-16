import Image from "next/image";
import Link from "next/link";
import React from "react";

const list = ["Home", "About", "Contact", "Login"];

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-center items-center w-full pt-12 text-black">
      <div className="w-1/3 bg-white rounded-full flex flex-row justify-between items-center pr-10  shadow-2xl/60 shadow-primary">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            width={60}
            height={60}
            alt="logo"
            className="object-contain hover:animate-spin transition-transform duration-700 cursor-pointer"
          />
        </Link>

        {list.map((allList) => (
          <h1
            className="text-xl relative cursor-pointer  before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-[#3B82F6] before:transition-all before:duration-300 hover:before:w-full"
            key={allList}
          >
            {allList}
          </h1>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
