import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

const EventCard = ({
  name,
  date,
  description,
  location,
  owner,
}: {
  name: string;
  date: string;
  description: string;
  location: string;
  owner: string | null;
}) => {
  return (
    <Card className="w-[350px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 text-white">
      <CardHeader className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <CardTitle className="font-rubik text-2xl font-light leading-tight line-clamp-2 pr-2">
            {name}
          </CardTitle>
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={24}
            height={24}
            className="cursor-pointer"
          />
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
            <span className="truncate text-sm">{date}</span>
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

        <Button className="w-full mt-4">Attend Event</Button>
      </CardHeader>
    </Card>
  );
};

export default EventCard;
