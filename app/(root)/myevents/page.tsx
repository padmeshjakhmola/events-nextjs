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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [openTextAreas, setOpenTextAreas] = useState<TextAreasState>({});
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [cancelReasons, setCancelReasons] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/me`, {
        // method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        router.push("/sign-in");
      }
      const data = await res.json();
      setUser(data.user);
    };

    fetchUser();
  }, [router]);

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

  const handleSubmit = async (attendee: Attendee, eventId: string) => {
    if (!cancelReasons[attendee.id]) return alert("Please provide a reason.");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/events/${eventId}/cancle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: attendee.id,
            reason: cancelReasons[attendee.id],
          }),
        }
      );

      const result = await response.json();
      if (result.message === "attendee_cancelled") {
        // Update local event state to mark the attendee as cancelled
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  attendees: event.attendees.map((a) =>
                    a.id === attendee.id
                      ? {
                          ...a,
                          is_cancelled: true,
                          cancellation_reason: cancelReasons[attendee.id],
                        }
                      : a
                  ),
                }
              : event
          )
        );
        setOpenTextAreas((prev) => ({ ...prev, [attendee.id]: false }));
        setCancelReasons((prev) => ({ ...prev, [attendee.id]: "" }));
      }
    } catch (error) {
      console.error("Cancellation error:", error);
    }
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
                                      <Textarea
                                        placeholder="Reason for cancellation"
                                        value={cancelReasons[attendee.id] || ""}
                                        onChange={(e) =>
                                          setCancelReasons((prev) => ({
                                            ...prev,
                                            [attendee.id]: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                  )}
                                {!attendee.is_cancelled && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => {
                                      if (openTextAreas[attendee.id]) {
                                        handleSubmit(attendee, event.id);
                                      } else {
                                        setOpenTextAreas((prev) => ({
                                          ...prev,
                                          [attendee.id]: true,
                                        }));
                                      }
                                    }}
                                  >
                                    {openTextAreas[attendee.id]
                                      ? "Submit"
                                      : "Cancel Registration"}
                                  </Button>
                                )}
                                {attendee.is_cancelled && (
                                  <span className="text-sm text-gray-500">
                                    Cancelled: {attendee.cancellation_reason}
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
