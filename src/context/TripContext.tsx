import React, { createContext, useContext, useState } from "react";

export interface TripAnswers {
  budget: string;
  duration: string;
  customDuration: string;
  mood: string;
  region: string;
  customRegion: string;
}

interface TripContextType {
  answers: TripAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<TripAnswers>>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<TripAnswers>({
    budget: "",
    duration: "",
    customDuration: "",
    mood: "",
    region: "",
    customRegion: "",
  });

  return (
    <TripContext.Provider value={{ answers, setAnswers }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
};
