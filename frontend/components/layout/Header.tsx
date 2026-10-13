"use client";

import { Suspense } from "react";
import { Search, List } from "lucide-react";
import { TemperatureUnitSwitch } from "@/components/weather";
import { Icon } from "@/components/ui";
import { CitySearch } from "@/components/ui/CitySearch";
import { useMobileSidebar } from "@/context/MobileSidebarContext";

export function Header() {
  const { openSidebar } = useMobileSidebar();
  return (
    <header className="top-0 z-50 flex items-center gap-x-2 px-8 py-4 backdrop-blur-md sm:sticky sm:gap-x-8 sm:py-7 lg:justify-between">
      <button
        type="button"
        onClick={openSidebar}
        aria-label="Open navigation menu"
        aria-controls="sidebar"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg surface transition-colors hover:bg-black/5 lg:hidden dark:hover:bg-white/10"
      >
        <Icon icon={List} />
      </button>
      <div className="relative w-full max-w-125">
        <Icon
          icon={Search}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <CitySearch />
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden h-10 min-w-max items-center justify-between gap-2 rounded-lg surface px-3 py-2.5 font-mono text-xs font-medium lg:flex">
          <div className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"></div>
          <div className="pr-4">
            <p>Live Open-Meteo</p>
            <p>Sync: 100% OK</p>
            {/* TODO: Make it work fr */}
          </div>
          <div className="ml-4 text-neutral-600 dark:text-neutral-300">
            <p>14:32 CEST</p>
            <p>(2m ago)</p>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="relative flex h-10 w-18 rounded-lg surface" />
          }
        >
          <TemperatureUnitSwitch />
        </Suspense>
        {/*  TODO: Profile pic along with profile itself */}
      </div>
    </header>
  );
}
