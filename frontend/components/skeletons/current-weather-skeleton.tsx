import { Skeleton } from "@/components/ui/skeleton";
import { CloudRain, Droplets, Eye, Gauge, Navigation, Sun } from "lucide-react";
import { Icon } from "@/components/ui/icon";

const labels = [
  { label: "Humidity", icon: Droplets },
  { label: "Wind", icon: Navigation },
  { label: "Pressure", icon: Gauge },
  { label: "Visibility", icon: Eye },
  { label: "UV Index", icon: Sun },
  { label: "Precipitation", icon: CloudRain },
];

export function CurrentWeatherSkeleton() {
  return (
    <section className="flex min-h-75 flex-col gap-5 xl:flex-row">
      <div className="relative flex h-51 w-full flex-col-reverse rounded-2xl surface p-4 sm:h-62 sm:flex-row sm:justify-between sm:rounded-3xl sm:p-7 md:max-lg:h-60 lg:rounded-4xl xl:h-75 xl:w-1/2 xl:justify-between 2xl:h-76 2xl:w-2/3 2xl:pr-32">
        <div className="space-y-3 sm:space-y-4">
          <Skeleton className="size-10 sm:size-12 lg:size-18" />
          <div className="space-y-1 sm:space-y-0">
            <Skeleton className="h-6 w-30 sm:w-60" />
            <Skeleton className="h-6 w-30 sm:hidden" />
          </div>
          <div className="w-full space-y-1">
            <Skeleton className="h-4 max-w-full sm:h-5 sm:w-65 xl:w-64" />
            <Skeleton className="h-4 max-w-full sm:h-5 sm:w-76 xl:w-52" />
            <Skeleton className="hidden h-4 w-full sm:block sm:h-5 sm:w-48 lg:hidden" />
          </div>
        </div>
        <div className="absolute top-4 right-4 cursor-default space-y-2 select-none sm:static">
          <Skeleton className="size-24 rounded-2xl sm:size-32 2xl:size-50" />
          <div className="mx-auto mt-4 hidden max-h-8 w-max items-center rounded-full border border-neutral-600 px-3 py-2 sm:flex dark:border-neutral-300">
            <Skeleton className="h-4 w-14 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-3 xl:w-1/2 xl:grid-cols-2 2xl:w-1/3">
        {labels.map((item) => {
          return (
            <div
              key={`skeleton-${item.label}`}
              className="space-y-2.5 rounded-2xl surface p-4 md:rounded-3xl"
            >
              <div className="mr-auto flex items-center justify-center gap-2 sm:justify-between">
                <Icon icon={item.icon} />
                <span className="hidden text-sm sm:inline">{item.label}</span>
              </div>
              <div className="mt-auto flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                <Skeleton className="h-4 w-12 text-xs sm:h-6 md:h-7" />
                <Skeleton className="hidden w-20 text-xs sm:inline sm:h-6" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
