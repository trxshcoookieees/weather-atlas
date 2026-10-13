import Image from "next/image";
import { cn } from "@/lib/utils";

export const WEATHER_ICON_NAMES = [
  "clearDay",
  "clearNight",
  "partlyCloudyDay",
  "partlyCloudyNight",
  "overcast",
  "fog",
  "drizzle",
  "rain",
  "snow",
  "rainShowers",
  "snowShowers",
  "thunderstorm",
  "thunderstormHail",
  "severeThunderStorm",
] as const;

export type WeatherIconName = (typeof WEATHER_ICON_NAMES)[number];
export type WeatherIconVariant = "static" | "animated";

type WeatherIconProps = {
  name: WeatherIconName;
  variant?: WeatherIconVariant;
  alt?: string;
  size?: number;
  className?: string;
};

export function WeatherIcon({
  name,
  variant = "static",
  alt = "",
  size = 48,
  className,
}: WeatherIconProps) {
  const src = `/weather-icons/${variant}/${name}.svg`;

  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={alt}
      loading="eager"
      className={cn("shrink-0 select-none", className)}
    />
  );
}
