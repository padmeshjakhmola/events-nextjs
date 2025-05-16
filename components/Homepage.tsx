import React from "react";
import TypingText from "./animata/text/typing-text";
import HomeButton from "./HomeButton";

const Homepage = () => {
  return (
    <main>
      <div className="h-96 flex flex-col justify-center items-center">
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
          className="px-40"
        />
      </div>
      <div className=" flex flex-col items-center justify-center">
        <HomeButton primaryColor="#3B82F6" className="cursor-pointer" />
      </div>
    </main>
  );
};

export default Homepage;
