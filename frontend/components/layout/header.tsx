"use client";

import { Search } from "lucide-react";
import { TemperatureUnitSwitch } from "@/components/weather";
import { Icon } from "@/components/ui";

export function Header() {
  return (
    <header
      className={
        "flex h-18.75 items-center justify-between gap-x-8 border-b border-slate-300/50 px-8"
      }
    >
      <div className="relative w-full max-w-125">
        <Icon
          icon={Search}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search city or coordinates"
          className="h-10 w-full surface pr-3 pl-9 text-sm outline-cyan-600/30 placeholder:text-slate-400 focus:outline"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-10 min-w-max items-center justify-between gap-2 surface px-3 py-2.5 font-mono text-xs font-medium">
          <div className="size-1.5 rounded-full bg-green-500"></div>
          <div className="pr-4 text-slate-600">
            <p>Live Open-Meteo</p>
            <p>Sync: 100% OK</p>
            {/*  TODO: Make it work fr */}
          </div>
          <div className="ml-4 text-slate-600/70">
            <p>14:32 CEST</p>
            <p>(2m ago)</p>
          </div>
        </div>
        <TemperatureUnitSwitch />
        {/*  TODO: Profile pic along with profile itself */}
      </div>
    </header>
  );
}
