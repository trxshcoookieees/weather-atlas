import { Skeleton } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui";
import { CloudRain, Droplets, Eye, Gauge, Navigation, Sun } from "lucide-react";

export function CurrentWeatherSkeleton() {
  const labels = [
    { label: "Humidity", icon: Droplets },
    { label: "Wind", icon: Navigation },
    { label: "Pressure", icon: Gauge },
    { label: "Visibility", icon: Eye },
    { label: "UV Index", icon: Sun },
    { label: "Precipitation", icon: CloudRain },
  ];
  return (
    <section className="flex min-h-75 flex-col gap-5 xl:flex-row">
      <div className="h-50 rounded-2xl surface p-4 sm:h-62 sm:flex-row sm:rounded-3xl sm:p-7 lg:rounded-4xl xl:h-75 xl:w-1/2 2xl:w-2/3 2xl:pr-32">
        <div className="space-y-3">
          <Skeleton className="h-4 w-12 sm:h-8 sm:w-28" />
          <Skeleton className="h-4 w-24 sm:w-36" />
          <Skeleton className="h-4 w-32 sm:w-52" />
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-3 xl:w-1/2 xl:grid-cols-2 2xl:w-1/3">
        {labels.map(({ label, icon }) => (
          <div
            key={label}
            className="flex h-19 min-w-0 flex-col justify-between gap-2.5 rounded-2xl surface p-3 sm:h-21 sm:rounded-3xl sm:p-4 md:h-22.5"
          >
            <div className="flex items-center gap-2 sm:justify-between">
              <Icon icon={icon} className="size-4 shrink-0 max-sm:mx-auto" />
              <span className="hidden text-sm sm:inline">{label}</span>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
