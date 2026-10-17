import { City } from "@/lib/weather/types";

const SAVED_CITIES_STORAGE_KEY = "wa:saved-cities";
const ACTIVE_CITY_STORAGE_KEY = "wa:active-city";

export function getSavedCities(): City[] {
  try {
    const value = localStorage.getItem(SAVED_CITIES_STORAGE_KEY);
    return value ? (JSON.parse(value) as City[]) : [];
  } catch {
    return [];
  }
}

export function saveCity(city: City) {
  const cities = getSavedCities();

  if (cities.some((c) => c.id === city.id)) return;

  localStorage.setItem(
    SAVED_CITIES_STORAGE_KEY,
    JSON.stringify([...cities, city]),
  );
}

export function setActiveCity(city: City) {
  localStorage.setItem(ACTIVE_CITY_STORAGE_KEY, JSON.stringify(city));
}

export function getActiveCity(): City {
  const city = localStorage.getItem(ACTIVE_CITY_STORAGE_KEY);

  if (!city) {
    throw new Error("No active city found.");
  }

  try {
    return JSON.parse(city) as City;
  } catch {
    throw new Error("Active city contains invalid JSON.");
  }
}

export function removeCity(id: number) {
  const cities = getSavedCities().filter((c) => c.id !== id);

  localStorage.setItem(SAVED_CITIES_STORAGE_KEY, JSON.stringify(cities));
}
