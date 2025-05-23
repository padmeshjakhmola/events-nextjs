"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user.actions";

const Events = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await getCurrentUser();
      if (!res) {
        router.push("/sign-in");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="py-32 px-28">
      <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row justify-between items-center">
        <h1 className="text-2xl md:text-4xl text-center font-semibold select-none">
          My Events
        </h1>
        <div className="space-x-4 flex">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <EventForm closeDialog={() => setIsDialogOpen(false)} />
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
