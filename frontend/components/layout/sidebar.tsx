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
  Wind,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui";

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Forecast",
    href: "/forecast",
    icon: CalendarDays,
  },
  {
    label: "Historical",
    href: "/historical",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Map",
    href: "/map",
    icon: Map,
  },
  {
    label: "Compare",
    href: "/compare",
    icon: Scale,
  },
  {
    label: "Air Quality",
    href: "/air-quality",
    icon: Wind,
  },
];
const currentCity = "Amsterdam";
const savedCities = [
  {
    label: "Amsterdam",
    temperature: 18,
  },
  {
    label: "London",
    temperature: 16,
  },
  {
    label: "Mikkeli",
    temperature: 12,
  },
  {
    label: "Krasnoyarsk",
    temperature: 9,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      id="sidebar"
      role="navigation"
      className={
        "min-w-max space-y-7.5 border border-slate-300/50 bg-white px-5 py-7 text-sm text-slate-600"
      }
    >
      <div className={"items-center space-y-px rounded-lg bg-cyan-600/20 p-4"}>
        <p className={"text-lg font-semibold text-cyan-900"}>Weather Atlas</p>
        <p className={"font-mono text-xs text-gray-600"}>
          Powered by{" "}
          <Link href={"https://open-meteo.com/"} className={"underline"}>
            Open-Meteo
          </Link>
        </p>
      </div>
      <div className="divide-y divide-slate-300/50">
        <nav className="pb-3.75">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.label}
                className={cn(
                  "nav-item",
                  isActive &&
                    "rounded-lg bg-cyan-600/20 font-semibold text-cyan-900",
                )}
              >
                <Icon icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="py-3.75">
          <div className="mb-2.5 flex items-center justify-between px-2">
            <span className="font-semibold capitalize">Saved Locations</span>
            <Icon icon={MapPinPlus} />
          </div>
          <ul className="space-y-1.5">
            {savedCities.map((item) => {
              const isActive = item.label == currentCity;
              return (
                <li
                  key={item.label}
                  className={cn(
                    "nav-item justify-between",
                    isActive &&
                      "rounded-lg bg-cyan-600/20 font-semibold text-cyan-900",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon icon={isActive ? MapPinHouse : MapPin} />
                    <span>{item.label}</span>
                  </div>
                  <span>{item.temperature}°C</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="space-y-1.5 pt-3.75 text-sm">
          <div className="nav-item">
            <Icon icon={Settings2} />
            <span>Settings</span>
          </div>
          <div className="nav-item">
            <Icon icon={CircleHelp} />
            <span>Help & Data</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
