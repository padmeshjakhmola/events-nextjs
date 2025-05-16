import Image from "next/image";
import Link from "next/link";
import React from "react";

const list = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/about" },
  { id: 3, name: "Contact", link: "/contact" },
  { id: 4, name: "Events", link: "/events" },
];

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-center items-center w-full pt-12 text-black">
      <div className="w-1/3 bg-white rounded-full flex flex-row justify-between items-center pr-10  shadow-2xl/60 shadow-primary">
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
            <h1 className="text-xl relative cursor-pointer  before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-[#3B82F6] before:transition-all before:duration-300 hover:before:w-full">
              {allList.name}
            </h1>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
