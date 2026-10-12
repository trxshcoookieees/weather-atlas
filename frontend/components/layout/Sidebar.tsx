"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChartNoAxesCombined,
  CircleHelp,
  LayoutDashboard,
  Map,
  MapPin,
  MapPinHouse,
  MapPinPlus,
  Scale,
  Settings2,
  Trash,
  Wind,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui";
import { useCity } from "@/context/CityContext";

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
  const { activeCity, setActiveCity, savedCities, removeCity } = useCity();

  if (!activeCity) {
    return null;
  }

  if (!savedCities) {
    return null;
  }

  return (
    <aside
      id="sidebar"
      role="navigation"
      className="h-full w-60 space-y-4 bg-transparent px-5 py-7"
    >
      <div className="surface items-center space-y-px rounded-lg p-4">
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
                  router.push(
                    `/${city.countryCode}/${city.admin1}/${city.name}/today`,
                  );
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon icon={isActive ? MapPinHouse : MapPin} />
                  <span>{city.name}</span>
                </div>
                <div
                  className="flex cursor-pointer items-center gap-3 transition-colors hover:text-red-500"
                  onClick={() => removeCity(city.id)}
                >
                  <Icon icon={Trash} />
                </div>
                {/*<span>{city.temperature}°C</span>*/}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="flex h-10 items-center gap-3 px-2">
          <Icon icon={Settings2} />
          <span>Settings</span>
        </div>
        <div className="flex h-10 items-center gap-3 px-2">
          <Icon icon={CircleHelp} />
          <span>Help & Data</span>
        </div>
      </div>
    </aside>
  );
}
