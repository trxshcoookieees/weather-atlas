"use client";

import { CitySearch } from "@/components/ui/CitySearch";
import { Icon } from "@/components/ui";
import { Search } from "lucide-react";
import { getSavedCities, SavedCity } from "@/lib/weather/saved-cities";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function WelcomeClient() {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    let cities: SavedCity[] = [];

    try {
      cities = getSavedCities();
      if (!Array.isArray(cities)) cities = [];
    } catch {
      cities = [];
    }

    const activeCityId = localStorage.getItem("active-city-id");
    const activeCity = cities.find((city) => String(city.id) === activeCityId);

    if (activeCity) {
      router.replace(
        `/overview?city=${encodeURIComponent(String(activeCity.id))}`,
      );
      return;
    }

    setChecked(true);
  }, [router]);

  if (!checked) {
    return <div aria-label="Loading..."></div>;
  }

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
        <CitySearch />
      </div>
    </div>
  );
}
