"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function TemperatureUnitSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUnit = searchParams.get("unit") === "F" ? "F" : "C";

  const setUnit = (unit: "C" | "F") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("unit", unit);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="relative flex h-10 w-18 rounded-lg surface"
      role="group"
      aria-label="Temperature unit"
    >
      <div
        className={cn(
          "absolute top-1 left-1 size-8 rounded-md surface",
          "transition-transform duration-200 ease-out",
          currentUnit === "F" && "translate-x-8",
        )}
      />

      <button
        type="button"
        onClick={() => setUnit("C")}
        className={cn(
          "relative z-10 w-1/2 cursor-pointer text-xs font-semibold transition-colors duration-200",
          currentUnit === "C" ? "" : "text-neutral-600 dark:text-neutral-300",
        )}
        aria-pressed={currentUnit === "C"}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => setUnit("F")}
        className={cn(
          "relative z-10 w-1/2 cursor-pointer text-xs font-semibold transition-colors duration-200",
          currentUnit === "F" ? "" : "text-neutral-600 dark:text-neutral-300",
        )}
        aria-pressed={currentUnit === "F"}
      >
        °F
      </button>
    </div>
  );
}
