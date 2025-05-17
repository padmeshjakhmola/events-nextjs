"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Event {
  id: string;
  name: string;
  description: string;
  owner: string;
  owner_name: string;
  attendees: Attendee[];
}

interface Attendee {
  id: string;
  fullname: string;
  email: string;
  is_cancelled: boolean;
  cancellation_reason: string | null;
}

interface User {
  id: string;
  name: string;
}

interface TextAreasState {
  [key: string]: boolean;
}

export default function MyEvents() {
  const [openTextAreas, setOpenTextAreas] = useState<TextAreasState>({});
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/events`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error("fetching_error:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (userId: number): void => {
    setOpenTextAreas((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  if (!user) return <p className="text-center mt-20">Loading your events...</p>;

  const myEvents = events.filter((event) => event.owner === user.id);

  return (
    <div className="py-32 px-28">
      <h1 className="text-4xl font-semibold select-none pb-16">
        My Created Events:
      </h1>

      {myEvents.length === 0 ? (
        <p className="text-xl text-gray-400">
          You have not created any events yet.
        </p>
      ) : (
        <Table className="text-lg">
          <TableCaption>Your all event details</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">
                Users attending event
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.id}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer">Show all users</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>All User Info</DialogTitle>
                        <DialogDescription>
                          Users attending: <strong>{event.name}</strong>
                        </DialogDescription>
                      </DialogHeader>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">User</TableHead>
                            <TableHead className="text-right">
                              Registration
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {event.attendees.map((attendee) => (
                            <TableRow key={attendee.id}>
                              <TableCell>{attendee.fullname}</TableCell>
                              <TableCell className="text-right space-x-2">
                                {!attendee.is_cancelled &&
                                  openTextAreas[attendee.id] && (
                                    <div className="mb-2">
                                      <Textarea placeholder="Reason for cancellation" />
                                    </div>
                                  )}
                                {!attendee.is_cancelled && (
                                  <Button
                                    type="submit"
                                    variant="destructive"
                                    onClick={() =>
                                      handleSubmit(Number(attendee.id))
                                    }
                                  >
                                    {openTextAreas[attendee.id]
                                      ? "Submit"
                                      : "Cancel Registration"}
                                  </Button>
                                )}
                                {attendee.is_cancelled && (
                                  <span className="text-sm text-gray-500">
                                    Cancelled
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <DialogFooter />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
