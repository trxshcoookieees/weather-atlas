"use client";

import { Icon } from "@/components/ui/icon";
import { Heart } from "lucide-react";
import { saveCity, SavedCity } from "@/lib/weather/saved-cities";

export function SaveCity(city: SavedCity) {
  return (
    <div
      className="flex cursor-pointer items-center gap-2"
      onClick={() => {
        console.log("SAVE");
        saveCity(city);
      }}
    >
      <Icon
        icon={Heart}
        className="stroke-neutral-600 dark:stroke-neutral-300"
      />
      <span className="text-sm font-semibold">Save</span>
    </div>
  );
}
