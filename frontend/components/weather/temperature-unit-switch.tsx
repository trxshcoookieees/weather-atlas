import { cookies } from "next/headers";
import { setTemperatureUnit } from "@/app/actions/temperature";
import { cn } from "@/lib/utils";

export async function TemperatureUnitSwitch() {
  const unit =
    (await cookies()).get("temperature-unit")?.value === "F" ? "F" : "C";

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
          unit === "F" && "translate-x-8",
        )}
      />

      {(["C", "F"] as const).map((value) => (
        <form action={setTemperatureUnit} className="contents" key={value}>
          <input type="hidden" name="unit" value={value} />
          <button
            type="submit"
            className={cn(
              "relative z-10 w-1/2 cursor-pointer text-xs font-semibold transition-colors duration-200",
              unit === value ? "" : "text-neutral-600 dark:text-neutral-300",
            )}
            aria-pressed={unit === value}
          >
            °{value}
          </button>
        </form>
      ))}
    </div>
  );
}
