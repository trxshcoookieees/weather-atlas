import clearDayStatic from "@meteocons/svg-static/fill/clear-day.svg";
import clearNightStatic from "@meteocons/svg-static/fill/clear-night.svg";
import partlyCloudyDayStatic from "@meteocons/svg-static/fill/partly-cloudy-day.svg";
import partlyCloudyNightStatic from "@meteocons/svg-static/fill/partly-cloudy-night.svg";
import overcastStatic from "@meteocons/svg-static/fill/overcast.svg";
import fogStatic from "@meteocons/svg-static/fill/fog.svg";
import drizzleStatic from "@meteocons/svg-static/fill/drizzle.svg";
import rainStatic from "@meteocons/svg-static/fill/rain.svg";
import snowStatic from "@meteocons/svg-static/fill/snow.svg";
import rainShowersStatic from "@meteocons/svg-static/fill/extreme-rain.svg";
import snowShowersStatic from "@meteocons/svg-static/fill/extreme-snow.svg";
import thunderstormStatic from "@meteocons/svg-static/fill/thunderstorms-overcast.svg";
import thunderstormHailStatic from "@meteocons/svg-static/fill/thunderstorms-hail.svg";
import severeThunderStormStatic from "@meteocons/svg-static/fill/extreme-thunderstorms-extreme-rain.svg";

import clearDayAnimated from "@meteocons/svg/fill/clear-day.svg";
import clearNightAnimated from "@meteocons/svg/fill/clear-night.svg";
import partlyCloudyDayAnimated from "@meteocons/svg/fill/partly-cloudy-day.svg";
import partlyCloudyNightAnimated from "@meteocons/svg/fill/partly-cloudy-night.svg";
import overcastAnimated from "@meteocons/svg/fill/overcast.svg";
import fogAnimated from "@meteocons/svg/fill/fog.svg";
import drizzleAnimated from "@meteocons/svg/fill/drizzle.svg";
import rainAnimated from "@meteocons/svg/fill/rain.svg";
import snowAnimated from "@meteocons/svg/fill/snow.svg";
import rainShowersAnimated from "@meteocons/svg/fill/extreme-rain.svg";
import snowShowersAnimated from "@meteocons/svg/fill/extreme-snow.svg";
import thunderstormAnimated from "@meteocons/svg/fill/thunderstorms-overcast.svg";
import thunderstormHailAnimated from "@meteocons/svg/fill/thunderstorms-hail.svg";
import severeThunderStormAnimated from "@meteocons/svg/fill/extreme-thunderstorms-extreme-rain.svg";

export const staticWeatherIcons = {
  clearDay: clearDayStatic,
  clearNight: clearNightStatic,
  partlyCloudyDay: partlyCloudyDayStatic,
  partlyCloudyNight: partlyCloudyNightStatic,
  overcast: overcastStatic,
  fog: fogStatic,
  drizzle: drizzleStatic,
  rain: rainStatic,
  snow: snowStatic,
  rainShowers: rainShowersStatic,
  snowShowers: snowShowersStatic,
  thunderstorm: thunderstormStatic,
  thunderstormHail: thunderstormHailStatic,
  severeThunderStorm: severeThunderStormStatic,
} as const;

export const animatedWeatherIcons = {
  clearDay: clearDayAnimated,
  clearNight: clearNightAnimated,
  partlyCloudyDay: partlyCloudyDayAnimated,
  partlyCloudyNight: partlyCloudyNightAnimated,
  overcast: overcastAnimated,
  fog: fogAnimated,
  drizzle: drizzleAnimated,
  rain: rainAnimated,
  snow: snowAnimated,
  rainShowers: rainShowersAnimated,
  snowShowers: snowShowersAnimated,
  thunderstorm: thunderstormAnimated,
  thunderstormHail: thunderstormHailAnimated,
  severeThunderStorm: severeThunderStormAnimated,
} as const;

export type WeatherIconName = keyof typeof staticWeatherIcons;
export type WeatherIconVariant = "static" | "animated";
