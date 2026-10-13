import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function generateWeatherMetadata(cityName: string, regionName: string) {
  return {
    title: `${cityName} Weather Forecast`,
    description: `Check the current weather, hourly forecast, adn 7-day weather outlook for ${cityName}, ${regionName}`,
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

const COMPASS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
] as const;

export function compassPoint(deg: number) {
  return COMPASS[Math.round(deg / 22.5) % 16];
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
