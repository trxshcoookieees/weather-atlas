import { cn } from "@/lib/utils";
import { useTemperatureUnit } from "@/components/providers";

export function TemperatureUnitSwitch() {
  const { unit, setUnit } = useTemperatureUnit();

  return (
    <div
      className="relative flex h-10 w-18 surface p-1"
      role="group"
      aria-label="Temperature unit"
    >
      <div
        className={cn(
          "absolute top-0.75 left-0.75 size-8 rounded-md bg-cyan-600/20 shadow-sm",
          "transition-transform duration-200 ease-out",
          unit === "F" && "translate-x-8",
        )}
      />

      <button
        type="button"
        onClick={() => setUnit("C")}
        className={cn(
          "relative z-10 w-1/2 cursor-pointer text-xs font-semibold transition-colors duration-200",
          unit === "C" ? "text-cyan-900" : "text-slate-600",
        )}
        aria-pressed={unit === "C"}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => setUnit("F")}
        className={cn(
          "relative z-10 w-1/2 cursor-pointer text-xs font-semibold transition-colors duration-200",
          unit === "F" ? "text-cyan-900" : "text-slate-600",
        )}
        aria-pressed={unit === "F"}
      >
        °F
      </button>
    </div>
  );
}
