"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

interface Events {
  id: string;
  date: string;
  description: string;
  location: string;
  name: string;
  owner_name: string | null;
}

const AllEvents = () => {
  const [events, setEvents] = useState<Events[]>([]);
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

  return (
    <div className="py-32 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-20 justify-items-center">
      {events.map((event) => (
        <div key={event.id}>
          <EventCard
            date={event.date}
            description={event.description}
            location={event.location}
            name={event.name}
            owner={event.owner_name ?? null}
          />
        </div>
      ))}
    </div>
  );
};

export default AllEvents;
