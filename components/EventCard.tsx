import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

const EventCard = () => {
  return (
    <>
      <Card className="w-[350px] max-h-96 rounded-4xl overflow-hidden py-10">
        <CardHeader className="">
          <div className="px-4">
          <CardTitle className="font-rubik font-light text-3xl h-[60px] line-clamp-2">
              Swis Chalet
            </CardTitle>
            <CardDescription className="py-2 text-lg h-[100px] text-white/80 line-clamp-2">
              A cozy event where you can meet yourself and friends.
            </CardDescription>
            <div className="flex flex-row items-center justify-between py-10 max-w truncate">
              <div className="flex flex-row justify-center items-center gap-2 overflow-hidden max-w-[150px]">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="date"
                  width={30}
                  height={30}
                  className="object-cover invert"
                />
                <h1 className="truncate">Date</h1>
              </div>
              <div className="flex flex-row justify-center items-center gap-2 overflow-hidden max-w-[100px]">
                <Image
                  src="/assets/icons/location.svg"
                  alt="date"
                  width={20}
                  height={20}
                  className="object-cover invert"
                />
                <h1 className="truncate">Location</h1>
              </div>
            </div>
            <Button className="w-full cursor-pointer">Attend Event</Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default EventCard;
