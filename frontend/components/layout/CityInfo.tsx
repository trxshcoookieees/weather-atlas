"use client";

import { SaveCity } from "@/components/ui/SaveCity";
import { useCity } from "@/context/CityContext";

export function CityInfo() {
  const { activeCity } = useCity();
  if (!activeCity) {
    return null;
  }
  return (
    <section className="flex items-center justify-between px-8">
      <div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-semibold">{activeCity.name}</span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {[activeCity.admin1, activeCity.country].filter(Boolean).join(", ")}
          </span>
        </div>
        {/*<p className="text-sm">{`Last update at ${lastUpdate}`}</p>*/}
      </div>
      <SaveCity
        id={activeCity.id}
        name={activeCity.name}
        latitude={activeCity.latitude}
        longitude={activeCity.longitude}
        admin1={activeCity.admin1}
        country={activeCity.country}
        countryCode={activeCity.countryCode}
      />
    </section>
  );
}
