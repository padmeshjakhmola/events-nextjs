"use client";
import { createContext, useContext, useState } from "react";

type EventContextType = {
  refreshEvents: () => void;
  trigger: boolean;
};

const GlobalContext = createContext<EventContextType>({
  refreshEvents: () => {},
  trigger: false,
});

export const useEventContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [trigger, setTrigger] = useState(false);

  const refreshEvents = () => setTrigger((prev) => !prev);

  return (
    <GlobalContext.Provider value={{ refreshEvents, trigger }}>
      {children}
    </GlobalContext.Provider>
  );
};
