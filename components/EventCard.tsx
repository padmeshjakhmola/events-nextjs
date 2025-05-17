"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Attendee {
  id: string;
  fullname: string;
  email: string;
  is_cancelled: boolean;
  cancellation_reason: string | null;
}

const EventCard = ({
  id,
  name,
  date,
  description,
  location,
  owner,
  owner_id,
  attendees,
  onDelete,
}: {
  id: string;
  name: string;
  date: string;
  description: string;
  location: string;
  owner: string | null;
  owner_id: string | null;
  attendees: Attendee[];
  onDelete?: (id: string) => void; // <-- add this
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchUserAndCheck = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/me`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const user = await res.json();
        const uid = user?.user?.id;
        setUserId(uid);

        const isAttending = attendees.some(
          (a) => a.id === uid && !a.is_cancelled
        );

        setHasApplied(isAttending);
      } catch (error) {
        console.error("Failed to fetch user or check attendance", error);
      }
    };

    fetchUserAndCheck();
  }, [attendees]);

  const isOwner = userId === owner_id;

  const handleClick = async () => {
    if (!userId) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/events/${id}/attend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      }
    );

    await response.json();

    setHasApplied(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/events/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      alert("Event deleted successfully!");
      onDelete?.(id);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  return (
    <Card className="w-[350px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 text-white">
      <CardHeader className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <CardTitle className="font-rubik text-2xl font-light leading-tight line-clamp-2 pr-2">
            {name}
          </CardTitle>
          {isOwner && (
            <Image
              src="/assets/icons/delete.svg"
              alt="delete"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          )}
        </div>

        <CardDescription className="text-white/80 text-base line-clamp-3">
          {description}
        </CardDescription>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={20}
              height={20}
              className="invert"
            />
            <span className="truncate text-sm">
              {new Date(date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/location.svg"
              alt="location"
              width={18}
              height={18}
              className="invert"
            />
            <span className="truncate text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/profile.svg"
              alt="profile"
              width={18}
              height={18}
              className="invert"
            />
            <span className="truncate text-sm">{owner}</span>
          </div>
        </div>

        {hasApplied ? (
          <p className="text-green-400 text-center mt-4 font-medium">
            You are already attending 🎉
          </p>
        ) : attendees.some((a) => a.id === userId && a.is_cancelled) ? (
          <p className="text-red-400 text-center mt-4 font-medium">
            Canceled by owner ❌
          </p>
        ) : (
          <Button className="w-full mt-4" onClick={handleClick}>
            Attend Event
          </Button>
        )}
      </CardHeader>
    </Card>
  );
};

export default EventCard;
