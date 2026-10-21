"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { cn, slugify } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import {
  CalendarDays,
  ChartNoAxesCombined,
  LayoutDashboard,
  MapPin,
  MapPinHouse,
  MapPinPlus,
  Scale,
  Trash,
  Wind,
} from "lucide-react";
import { useCity } from "@/context/city-context";
import { useMobileSidebar } from "@/context/mobile-sidebar-context";

const navigation = [
  { label: "Overview", href: "today", icon: LayoutDashboard },
  { label: "Forecast", href: "forecast", icon: CalendarDays },
  { label: "Historical", href: "history", icon: ChartNoAxesCombined },
  { label: "Map", href: "map", icon: Map },
  { label: "Compare", href: "compare", icon: Scale },
  { label: "Air Quality", href: "air-quality", icon: Wind },
];

export function Navigation() {
  const { savedCities, removeCity } = useCity();
  const { closeSidebar } = useMobileSidebar();
  const { id } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = pathname.split("/").pop();
  return (
    <>
      <nav>
        {navigation.map((item) => {
          const isActive = item.href === current;

          return (
            <Link
              href={`${item.href}?${searchParams.toString()}`}
              key={item.label}
              className={cn(
                "flex h-10 items-center gap-3 px-2 text-sm text-neutral-600 dark:text-neutral-400",
                isActive &&
                  "text-md font-semibold text-neutral-800 dark:text-neutral-200",
              )}
            >
              {/*<Icon icon={item.icon} />*/}
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
            const isActive = city.id === Number(id);

            return (
              <li key={city.id}>
                <div
                  className={cn(
                    "flex h-10 cursor-pointer items-center justify-between gap-3 px-2 text-sm text-neutral-600 dark:text-neutral-400",
                    isActive &&
                      "text-md font-semibold text-neutral-800 dark:text-neutral-200",
                  )}
                >
                  <Link
                    href={`/${slugify(city.locale)}/${slugify(city.region)}/${slugify(city.name)}/${city.id}/today`}
                    onClick={closeSidebar}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    aria-current={isActive ? "location" : undefined}
                  >
                    <Icon icon={isActive ? MapPinHouse : MapPin} />
                    <span className="truncate">{city.name}</span>
                  </Link>

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
    </>
  );
}
