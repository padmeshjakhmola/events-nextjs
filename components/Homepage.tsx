import React from "react";
import TypingText from "./animata/text/typing-text";
import HomeButton from "./HomeButton";
import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
  return (
    <main className="py-32">
      <div className="h-96 flex flex-row justify-center items-center px-52">
        <div>
          <Image
            src="/assets/images/logo_full.png"
            alt="logo"
            width={300}
            height={300}
            className="object-contain pb-10"
          />
          <TypingText
            text={[
              "_Create, discover, and manage events effortlessly.",
              "_Your all-in-one event management dashboard.",
              "_Where every event finds its audience.",
              "_Simplify your event planning and stay connected.",
              "_Organize. Share. Celebrate.",
              "_Bringing people together, one event at a time.",
              "_The easy way to manage and explore events.",
            ]}
            className="lg:px-40 text-2xl lg:text-5xl"
          />
        </div>

        <Image
          src="/assets/images/meeting.png"
          alt="meeting"
          width={500}
          height={500}
          className="hidden md:flex object-contain"
        />
      </div>
      <div className=" flex flex-col items-center justify-center pt-32">
        <Link href="/events">
          <HomeButton primaryColor="#3B82F6" className="cursor-pointer" />
        </Link>
      </div>
    </main>
  );
};

export default Homepage;
