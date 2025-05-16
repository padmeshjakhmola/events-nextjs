import { Button } from "@/components/ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import EventCard from "@/components/EventCard";

const Events = () => {
  return (
    <div className="py-32 px-28">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-semibold select-none">My Events</h1>
        <div className="space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="text-lg py-6 text-center cursor-pointer select-none bg-[#334155] hover:bg-gray-600"
              >
                Sort By
                <Image
                  src="/assets/icons/Vector.svg"
                  width={10}
                  height={10}
                  alt="icon"
                  className="object-contain"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Accending</DropdownMenuItem>
              <DropdownMenuItem>Decending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="lg" className="text-lg py-6 text-center cursor-pointer">
            + Add Event
          </Button>
        </div>
      </div>

      {/* card */}
      <div className="py-32 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-20 justify-items-center">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default Events;
