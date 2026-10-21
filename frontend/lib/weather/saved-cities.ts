import { City } from "@/lib/weather/types";

const SAVED_CITIES_STORAGE_KEY = "wa:saved-cities";

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

export function removeCity(id: number) {
  const cities = getSavedCities().filter((c) => c.id !== id);

  localStorage.setItem(SAVED_CITIES_STORAGE_KEY, JSON.stringify(cities));
}
