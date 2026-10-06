import type { WMOWeatherCode } from "./weather-codes";

export type WeatherLabel =
  | "Clear sky"
  | "Mainly clear"
  | "Partly cloudy"
  | "Overcast"
  | "Fog"
  | "Depositing rime fog"
  | "Light drizzle"
  | "Moderate drizzle"
  | "Dense drizzle"
  | "Light freezing drizzle"
  | "Dense freezing drizzle"
  | "Slight rain"
  | "Moderate rain"
  | "Heavy rain"
  | "Light freezing rain"
  | "Heavy freezing rain"
  | "Slight snowfall"
  | "Moderate snowfall"
  | "Heavy snowfall"
  | "Snow grains"
  | "Slight rain showers"
  | "Moderate rain showers"
  | "Violent rain showers"
  | "Slight snow showers"
  | "Heavy snow showers"
  | "Thunderstorm"
  | "Thunderstorm with slight hail"
  | "Heavy thunderstorm"
  | "Thunderstorm with heavy hail";

const LABEL_BY_CODE: Record<WMOWeatherCode, WeatherLabel> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  97: "Heavy thunderstorm",
  99: "Thunderstorm with heavy hail",
};

export function getWeatherLabel(code: number): string {
  return LABEL_BY_CODE[code as WMOWeatherCode] ?? "Mostly cloudy";
}

export function getHumidityLabel(humidity: number): string {
  if (humidity < 30) return "Very dry";
  if (humidity < 40) return "Dry";
  if (humidity < 70) return "Comfortable";
  if (humidity < 80) return "Humid";
  return "Very humid";
}

export function getPressureLabel(pressureDelta: number): string {
  if (pressureDelta < -2) return "Falling";
  if (Math.abs(pressureDelta) < 2) return "Steady";
  return "Rising";
}

export function getVisibilityLabel(m: number): string {
  if (m < 1) return "Very poor";
  if (m < 4) return "Poor";
  if (m < 10) return "Moderate";
  if (m < 20) return "Good";
  return "Excellent";
}

export function getUVILabel(uvi: number): string {
  if (uvi < 3) return `${uvi} Low`;
  if (uvi < 6) return `${uvi} Moderate`;
  if (uvi < 8) return `${uvi} High`;
  if (uvi < 11) return `${uvi} Very high`;
  return `${uvi} Extreme`;
}

export function getWindLabel(degrees: number): string {
  return "what";
}
