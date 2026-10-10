import { Suspense } from "react";
import { Search } from "lucide-react";
import { TemperatureUnitSwitch } from "@/components/weather";
import { Icon } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 flex min-h-18.75 items-center justify-between gap-x-8 bg-transparent px-8 backdrop-blur-md">
      <div className="relative w-full max-w-125">
        <Icon
          icon={Search}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="search"
          placeholder="Search city or coordinates"
          className="surface h-10 w-full rounded-lg pr-3 pl-9 text-sm outline-black/10 focus:outline"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="surface flex h-10 min-w-max items-center justify-between gap-2 rounded-lg px-3 py-2.5 font-mono text-xs font-medium">
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
            <div className="surface relative flex h-10 w-18 rounded-lg" />
          }
        >
          <TemperatureUnitSwitch />
        </Suspense>
        {/*  TODO: Profile pic along with profile itself */}
      </div>
    </header>
  );
}
