"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useEventContext } from "@/context/GlobalContext";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trigger]);

  if (loading) {
    return <LoadingSpinner />;
  }

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

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center h-64">
    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    <span className="mt-2 text-xl font-semibold text-gray-700">
      Loading events...
    </span>
  </div>
);
