"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChartNoAxesCombined,
  LayoutDashboard,
  Map,
  MapPin,
  MapPinHouse,
  MapPinPlus,
  Scale,
  Trash,
  Wind,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui";
import { useCity } from "@/context/CityContext";
import { useWeather } from "@/context/WeatherContext";
import { useMobileSidebar } from "@/context/MobileSidebarContext";

const navigation = [
  { label: "Overview", href: "today", icon: LayoutDashboard },
  { label: "Forecast", href: "forecast", icon: CalendarDays },
  { label: "Historical", href: "history", icon: ChartNoAxesCombined },
  { label: "Map", href: "map", icon: Map },
  { label: "Compare", href: "compare", icon: Scale },
  { label: "Air Quality", href: "air-quality", icon: Wind },
];

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isOpen, closeSidebar } = useMobileSidebar();
  const { activeCity, savedCities, removeCity } = useCity();
  const { setCity } = useWeather();
  const current = pathname.split("/").pop();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-55 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}
      <aside
        id="sidebar"
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isOpen ? undefined : undefined}
        className={cn(
          "fixed inset-y-0 left-0 z-60 h-dvh w-60 space-y-4 overflow-y-auto bg-stone-200/95 px-5 py-7 shadow-xl backdrop-blur-xl transition-transform duration-300 ease-in-out dark:bg-gray-700/95",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:sticky lg:top-0 lg:z-auto lg:block lg:h-dvh lg:shrink-0 lg:translate-x-0 lg:overflow-visible lg:bg-transparent lg:shadow-none lg:backdrop-blur-none",
        )}
      >
        <div className="items-center space-y-px rounded-lg surface p-4">
          <p className="text-xl font-semibold">Weather Atlas</p>
          <p className="font-mono text-xs text-neutral-600 dark:text-neutral-300">
            Powered by{" "}
            <Link
              href="https://open-meteo.com/"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              Open-Meteo
            </Link>
          </p>
        </div>
        <nav>
          {navigation.map((item) => {
            const isActive = item.href === current;

            return (
              <Link
                href={`${item.href}?${searchParams.toString()}`}
                key={item.label}
                onClick={closeSidebar}
                className={cn(
                  "flex h-10 items-center gap-3 px-2 text-sm text-neutral-600 dark:text-neutral-400",
                  isActive &&
                    "text-md font-semibold text-neutral-800 dark:text-neutral-200",
                )}
              >
                <Icon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div>
          <div className="mb-2.5 flex items-center justify-between px-2">
            <span className="font-semibold">Saved Locations</span>
            <Icon icon={MapPinPlus} />
          </div>
          <ul className="space-y-1.5">
            {savedCities.map((city) => {
              const isActive = city.id === activeCity?.id;

              return (
                <li key={city.id}>
                  <div
                    className={cn(
                      "flex h-10 cursor-pointer items-center justify-between gap-3 px-2 text-sm text-neutral-600 dark:text-neutral-400",
                      isActive &&
                        "text-md font-semibold text-neutral-800 dark:text-neutral-200",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCity(city);
                        closeSidebar();
                      }}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      aria-current={isActive ? "location" : undefined}
                    >
                      <Icon icon={isActive ? MapPinHouse : MapPin} />
                      <span className="truncate">{city.name}</span>
                    </button>

                    <button
                      type="button"
                      aria-label={`Remove ${city.name} from saved locations`}
                      onClick={() => removeCity(city.id)}
                      className="flex shrink-0 items-center transition-colors hover:text-red-500"
                    >
                      <Icon icon={Trash} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
