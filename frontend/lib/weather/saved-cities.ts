export type SavedCity = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin?: string;
};

const STORAGE_KEY = "weather-atlas:saved-cities";
const CHANGE_EVENT = "saved-cities-changed";

export function getSavedCities(): SavedCity[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as SavedCity[]) : [];
  } catch {
    return [];
  }
}

export function saveCity(city: SavedCity) {
  const cities = getSavedCities();

  if (cities.some((savedCity) => savedCity.id === city.id)) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...cities, city]));

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function removeCity(id: number) {
  const cities = getSavedCities().filter((city) => city.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export { CHANGE_EVENT };
