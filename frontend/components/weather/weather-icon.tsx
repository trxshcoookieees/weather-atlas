"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  animatedWeatherIcons,
  staticWeatherIcons,
  type WeatherIconName,
  type WeatherIconVariant,
} from "@/components/weather/meteocons";

type WeatherIconProps = {
  name: WeatherIconName;
  variant?: WeatherIconVariant;
  alt?: string;
  size?: number;
  className?: string;
};

const VIEW_BOXES: Record<WeatherIconName, string> = {
  clearDay: "15 15 98 98",
  clearNight: "31.5 31.6 64.8 64.9",
  partlyCloudyDay: "17 29 87.5 60.5",
  partlyCloudyNight: "23.5 33.6 81 55.9",
  overcast: "23.6 38.5 84.9 51",
  fog: "23.6 38.5 80.9 65.5",
  drizzle: "23.6 38.5 80.9 52.5",
  rain: "23.6 38.5 80.9 57.5",
  snow: "23.6 38.5 80.9 56.5",
  rainShowers: "23.6 38.5 84.9 57.5",
  snowShowers: "23.6 38.5 84.9 56.5",
  thunderstorm: "23.6 38.5 84.9 70.4",
  thunderstormHail: "23.6 38.5 80.9 70.4",
  severeThunderStorm: "23.6 38.5 84.9 70.4",
};

function cropViewBox(markup: string, name: WeatherIconName): string {
  return markup.replace(/viewBox="[^"]*"/, `viewBox="${VIEW_BOXES[name]}"`);
}

// Fetch once per URL; a page with 10 tiles reuses the same entry.
const markupCache = new Map<string, Promise<string>>();

function loadMarkup(url: string): Promise<string> {
  let entry = markupCache.get(url);
  if (!entry) {
    entry = fetch(url).then((res) => {
      if (!res.ok) throw new Error(`SVG ${url}: ${res.status}`);
      return res.text();
    });
    markupCache.set(url, entry);
  }
  return entry;
}

export function WeatherIcon({
  name,
  variant = "static",
  alt = "",
  size = 48,
  className,
}: WeatherIconProps) {
  const icons =
    variant === "animated" ? animatedWeatherIcons : staticWeatherIcons;
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    loadMarkup(icons[name]).then((svg) => {
      if (alive) setMarkup(cropViewBox(svg, name));
    });
    return () => {
      alive = false;
    };
  }, [icons, name]);

  return (
    <span
      className={cn("grid shrink-0 content-center", className)}
      style={{ width: size, height: size }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      dangerouslySetInnerHTML={{ __html: markup ?? "" }}
    />
  );
}
