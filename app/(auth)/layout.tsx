import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-[#121212] p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Link href="/">
            <Image
              src="/assets/images/logo_full.png"
              alt="logo"
              width={200}
              height={200}
              className="h-auto transition-all hover:scale-105 invert"
            />
          </Link>
          <div className="space-y-5">
            <h1 className="h1 font-rubik">Express, Explore, Engage</h1>
            <p className="h3">
              Your all-in-one event management dashboard.
            </p>
          </div>
          <Image
            src="/assets/images/calendar.png"
            alt="Files"
            width={300}
            height={300}
            className="transition-all hover:scale-105 pt-18"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        {children}
      </section>
    </div>
  );
};

export default Layout;
