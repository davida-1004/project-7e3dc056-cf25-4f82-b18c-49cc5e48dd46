import React, { createContext, useContext, useState } from "react";
import { defaultTripAnswers, deserializeTripAnswers } from "@/lib/personalizedTrip";

export interface TripAnswers {
  budget: string;
  customBudget: string;
  budgetAmount: number;
  duration: string;
  customDuration: string;
  durationDays: number;
  mood: string;
  region: string;
  customRegion: string;
  selectedCountries: string[];
  selectedCities: string[];
}

interface TripContextType {
  answers: TripAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<TripAnswers>>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<TripAnswers>(() => {
    if (typeof window === "undefined") return defaultTripAnswers;

    const encoded = new URLSearchParams(window.location.search).get("trip");
    return deserializeTripAnswers(encoded) || defaultTripAnswers;
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
