export type Location = {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
};

export type CurrentWeather = {
  time: string;
  weatherCode: number;
  temperature: number;
  apparentTemperature: number;
  precipitation: number;
  humidity: number;
  cloudCover: number;
  pressureMsl: number;
  windDirection: number;
  windSpeed: number;
  windGusts: number;
  isDay: boolean;
};

export type HourlyWeather = {
  time: string;
  weatherCode: number;
  temperature: number;
  apparentTemperature: number;
  precipitationProbability: number;
  precipitation: number;
  humidity: number;
  cloudCover: number;
  pressureMsl: number;
  windDirection: number;
  windSpeed: number;
  windGusts: number;
  uvIndex: number;
  sunshineDuration: number;
  visibility: number;
  isDay: boolean;
};

export type DailyWeather = {
  time: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
  maxApparentTemperature: number;
  minApparentTemperature: number;
  precipitationProbability: number;
  precipitation: number;
  humidity: number;
  cloudCover: number;
  avgPressureMsl: number;
  maxPressureMsl: number;
  minPressureMsl: number;
  windDirection: number;
  windSpeed: number;
  windGusts: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  moonPhase: number;
  moonRise: string | null;
  moonSet: string | null;
  daylightDuration: number;
  sunlightDuration: number;
  visibility: number;
};

export type WeatherAPIResponse = {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

export type WeatherResponse = {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  previousDay: {
    hourly: HourlyWeather[];
    daily: DailyWeather;
  };
  pressureDelta: number;
  precipitationDelta: number;
};

export type City = {
  id: number;
  name: string;
  country?: string;
  country_code: string;
  admin1: string;
  latitude: number;
  longitude: number;
  timezone: string;
};
