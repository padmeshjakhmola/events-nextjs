import Image from "next/image";
import Link from "next/link";
import React from "react";

const list = ["Home", "About", "Contact", "Login"];

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-center items-center w-full pt-12 text-black">
      <div className="w-1/3 bg-slate-50 border rounded-full flex flex-row justify-between items-center pr-10">
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
          <h1 className="text-xl cursor-pointer" key={allList}>
            {allList}
          </h1>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
