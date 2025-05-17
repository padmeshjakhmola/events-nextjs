"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useEventContext } from "@/context/GlobalContext";

interface Attendee {
  id: string;
  fullname: string;
  email: string;
  is_cancelled: boolean;
  cancellation_reason: string | null;
}
interface Events {
  id: string;
  date: string;
  description: string;
  location: string;
  name: string;
  owner_name: string | null;
  owner: string | null;
  attendees: Attendee[];
}

const AllEvents = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const { trigger } = useEventContext();

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
  }, [trigger]);

  return (
    <div className="py-32 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-20 justify-items-center">
      {events.map((event) => (
        <div key={event.id}>
          <EventCard
            attendees={event.attendees}
            id={event.id}
            date={event.date}
            description={event.description}
            location={event.location}
            name={event.name}
            owner={event.owner_name ?? null}
            owner_id={event.owner ?? null}
            onDelete={(id) =>
              setEvents((prev) => prev.filter((event) => event.id !== id))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default AllEvents;
