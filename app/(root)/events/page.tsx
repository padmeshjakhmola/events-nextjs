import { Button } from "@/components/ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventForm from "@/components/EventForm";
import AllEvents from "@/components/AllEvents";

const Events = async () => {
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

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-lg py-6 text-center cursor-pointer"
              >
                + Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Event</DialogTitle>
                <DialogDescription>
                  Please fill in the following details to create a new event.
                </DialogDescription>
              </DialogHeader>
              <EventForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* card */}
      <AllEvents />
    </div>
  );
};

export default Events;
