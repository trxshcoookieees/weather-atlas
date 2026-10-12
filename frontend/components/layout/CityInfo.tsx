"use client";

import { SaveCity } from "@/components/ui/SaveCity";
import { useCity } from "@/context/CityContext";

export function CityInfo() {
  const { activeCity } = useCity();
  return (
    <section className="flex items-center justify-between">
      <div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-semibold">{activeCity.name}</span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {[activeCity.region, activeCity.country].filter(Boolean).join(", ")}
          </span>
        </div>
        <p className="text-sm">{`Last update at ${lastUpdate}`}</p>
      </div>
      <SaveCity
        id={activeCity.id}
        name={activeCity.name}
        latitude={activeCity.latitude}
        longitude={activeCity.longitude}
        region={activeCity.region}
        country={activeCity.country}
        countryCode={activeCity.countryCode}
      />
    </section>
  );
}
