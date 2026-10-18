import type { Metadata } from "next";
import { generateWeatherMetadata } from "@/lib/utils";
import { WeatherPage } from "./_components/WeatherPage";

type Props = {
  params: Promise<{
    countryCode: string;
    region: string;
    city: string;
    geocodingId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, region } = await params;

  const name = city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const regionName = region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return generateWeatherMetadata(name, regionName);
}

export default async function Today() {
  return <WeatherPage />;
}
