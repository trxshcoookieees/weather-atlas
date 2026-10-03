import type { WeatherIconName } from "@/components/weather/meteocons";

const WMO_CODES = [
  0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77,
  80, 81, 82, 85, 86, 95, 96, 97, 99,
] as const;

export type WMOWeatherCode = (typeof WMO_CODES)[number];

type IconEntity =
  WeatherIconName | { day: WeatherIconName; night: WeatherIconName };

const DAY_NIGHT = (day: WeatherIconName, night: WeatherIconName) => ({
  day,
  night,
});

const ICONS: Record<WMOWeatherCode, IconEntity> = {
  0: DAY_NIGHT("clearDay", "clearNight"),
  1: DAY_NIGHT("clearDay", "clearNight"),
  2: DAY_NIGHT("partlyCloudyDay", "partlyCloudyNight"),
  3: "overcast",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  80: "rainShowers",
  81: "rainShowers",
  82: "rainShowers",
  85: "snowShowers",
  86: "snowShowers",
  95: "thunderstorm",
  96: "thunderstormHail",
  97: "severeThunderStorm",
  99: "thunderstormHail",
};

export function getWeatherIconName(
  code: number,
  isDay: boolean,
): WeatherIconName {
  const entry = ICONS[code as WMOWeatherCode];

  if (!entry) return "overcast";
  if (typeof entry === "string") return entry;
  return isDay ? entry.day : entry.night;
}
