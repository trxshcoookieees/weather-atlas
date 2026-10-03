"use client";

import { createContext, useContext, useState } from "react";

type TemperatureUnit = "C" | "F";

type TemperatureContextValue = {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
};

const TemperatureContext = createContext<TemperatureContextValue | null>(null);

export function TemperatureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unit, setUnit] = useState<TemperatureUnit>("C");

  return (
    <TemperatureContext.Provider value={{ unit, setUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
}

export function useTemperatureUnit() {
  const context = useContext(TemperatureContext);

  if (!context) {
    throw new Error(
      "useTemperatureUnit() must be used within TemperatureProvider"
    );
  }

  return context;
}
