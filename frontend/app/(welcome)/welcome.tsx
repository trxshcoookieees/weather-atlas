"use client";

import { CitySearch } from "@/components/ui/city-search";
import { Icon } from "@/components/ui/icon";
import { Search } from "lucide-react";
import { Suspense } from "react";

export function WelcomeClient() {
  return (
    <div className="text-lg">
      <h1 className="mb-8 text-4xl font-semibold">Weather Atlas</h1>
      <p>A little clarity, wherever you are.</p>
      <p className="mb-4">
        Explore current weather and forecasts for any city.
      </p>
      <p className="mb-8">
        Start by searching for a city below. You will see the current
        conditions, temperature, and forecast so you can plan your day with
        confidence.
      </p>
      <div className="relative">
        <Icon
          icon={Search}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <Suspense fallback={<div />}>
          <CitySearch />
        </Suspense>
      </div>
    </div>
  );
}
