"use client";

import { CitySearch } from "@/components/ui/CitySearch";
import { Icon } from "@/components/ui";
import { Search } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCity } from "@/context/CityContext";
import { slugify } from "@/lib/utils";

export function WelcomeClient() {
  const router = useRouter();
  const { activeCity } = useCity();

  useEffect(() => {
    if (!activeCity) return;

    router.replace(
      `/${slugify(activeCity.countryCode)}/${slugify(activeCity.admin1)}/${slugify(activeCity.name)}/${activeCity.id}/today`,
    );
  }, [activeCity, router]);

  return (
    <div className="text-lg">
      <h1 className="mb-8 text-4xl font-semibold">Weather Atlas</h1>
      <p>A little clarity, wherever you are.</p>
      <p className="mb-4">
        Explore current weather and forecasts for any city.
      </p>
      <p className="mb-8">
        Start by searching for a city below. You will see the current
        conditions, temperature, and forecast so you can plan your day with
        confidence.
      </p>
      <div className="relative">
        <Icon
          icon={Search}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <Suspense fallback={<div />}>
          <CitySearch />
        </Suspense>
      </div>
    </div>
  );
}
