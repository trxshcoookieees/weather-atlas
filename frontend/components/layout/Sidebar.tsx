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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn, slugify } from "@/lib/utils";
import { Icon } from "@/components/ui";
import { useCity } from "@/context/CityContext";
import { useMobileSidebar } from "@/context/MobileSidebarContext";

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Forecast",
    href: "#",
    icon: CalendarDays,
  },
  {
    label: "Historical",
    href: "#",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Map",
    href: "#",
    icon: Map,
  },
  {
    label: "Compare",
    href: "#",
    icon: Scale,
  },
  {
    label: "Air Quality",
    href: "#",
    icon: Wind,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const unit = useSearchParams().get("unit") ?? "C";

  const { isOpen, closeSidebar } = useMobileSidebar();
  const { activeCity, setActiveCity, savedCities, removeCity } = useCity();

  if (!activeCity) {
    return null;
  }

  if (!savedCities) {
    return null;
  }

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
            <Link href={"https://open-meteo.com/"} className="underline">
              Open-Meteo
            </Link>
          </p>
        </div>
        <nav>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
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
              const isActive = city.id == activeCity.id;
              return (
                <li
                  key={city.id}
                  className={cn(
                    "flex h-10 cursor-pointer items-center justify-between gap-3 px-2 text-sm text-neutral-600 dark:text-neutral-400",
                    isActive &&
                      "text-md font-semibold text-neutral-800 dark:text-neutral-200",
                  )}
                  onClick={() => {
                    setActiveCity(city);
                    closeSidebar();
                    router.replace(
                      `/${slugify(city.locale)}/${slugify(city.region)}/${slugify(city.name)}/${city.id}/today?unit=${unit}`,
                    );
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon icon={isActive ? MapPinHouse : MapPin} />
                    <span>{city.name}</span>
                  </div>
                  <div
                    className="flex cursor-pointer items-center gap-3 transition-colors hover:text-red-500"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeCity(city.id);
                    }}
                  >
                    <Icon icon={Trash} />
                  </div>
                  {/*<span>{city.temperature}°C</span>*/}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
