"use client";

import { Icon } from "@/components/ui/icon";
import { Heart } from "lucide-react";
import type { City } from "@/lib/weather/types";
import { useCity } from "@/context/CityContext";
import { cn } from "@/lib/utils";

export function SaveCity(city: City) {
  const { saveCity, removeCity, savedCities } = useCity();

  const isSaved = savedCities.some((c: City) => c.id === city.id);

  const handleClick = () => {
    if (isSaved) {
      removeCity(city.id);
    } else {
      saveCity(city);
    }
  };

  return (
    <button
      aria-label="Save City"
      className="flex cursor-pointer items-center gap-2"
      onClick={handleClick}
      type="button"
    >
      <Icon
        icon={Heart}
        className={cn(
          "size-6 stroke-neutral-600 transition-colors sm:size-4.5 dark:stroke-neutral-300",
          isSaved &&
            "fill-rose-500 stroke-rose-500 dark:fill-rose-500 dark:stroke-rose-500",
        )}
      />
      <span className="hidden w-12 text-sm font-semibold sm:inline">
        {isSaved ? "Saved" : "Save"}
      </span>
    </button>
  );
}
