export type SavedCity = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  countryCode: string;
  admin1: string;
};

const SAVED_CITIES_STORAGE_KEY = "wa:saved-cities";
const ACTIVE_CITY_STORAGE_KEY = "wa:active-city";
const CHANGE_EVENT = "saved-cities-changed";

export function getSavedCities(): SavedCity[] {
  try {
    const value = localStorage.getItem(SAVED_CITIES_STORAGE_KEY);
    return value ? (JSON.parse(value) as SavedCity[]) : [];
  } catch {
    return [];
  }
}

export function saveCity(city: SavedCity) {
  const cities = getSavedCities();

  if (cities.some((c) => c.id === city.id)) return;

  localStorage.setItem(
    SAVED_CITIES_STORAGE_KEY,
    JSON.stringify([...cities, city]),
  );

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function setActiveCity(city: SavedCity) {
  localStorage.setItem(ACTIVE_CITY_STORAGE_KEY, JSON.stringify(city));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getActiveCity(): SavedCity {
  const city = localStorage.getItem(ACTIVE_CITY_STORAGE_KEY);

  if (!city) {
    throw new Error("No active city found.");
  }

  try {
    return JSON.parse(city) as SavedCity;
  } catch {
    throw new Error("Active city contains invalid JSON.");
  }
}

export function removeCity(id: number) {
  const cities = getSavedCities().filter((c) => c.id !== id);

  localStorage.setItem(SAVED_CITIES_STORAGE_KEY, JSON.stringify(cities));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export { CHANGE_EVENT };
