import { Skeleton } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui";
import { CloudRain, Droplets, Eye, Gauge, Navigation, Sun } from "lucide-react";

export function CurrentWeatherSkeleton() {
  return (
    <section className="flex min-h-75 gap-5">
      <div className="surface flex w-2/3 items-center justify-between rounded-4xl p-7 pr-32">
        <div className="h-full space-y-3">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-4 w-56.25" />
          <Skeleton className="h-4 w-lg" />
        </div>
      </div>
      <div className="grid w-1/3 grid-cols-2 grid-rows-3 gap-3">
        <div className="surface flex flex-col justify-between space-y-2.5 rounded-3xl p-4">
          <div className="mr-auto flex items-center gap-2">
            <Icon icon={Droplets} />
            <span className="text-sm">Humidity</span>
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="surface flex flex-col justify-between space-y-2.5 rounded-3xl p-4">
          <div className="mr-auto flex items-center gap-2">
            <Icon icon={Navigation} />
            <span className="text-sm">Wind</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="surface flex flex-col justify-between space-y-2.5 rounded-3xl p-4">
          <div className="mr-auto flex items-center gap-2">
            <Icon icon={Gauge} />
            <span className="text-sm">Pressure</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="surface flex flex-col justify-between space-y-2.5 rounded-3xl p-4">
          <div className="mr-auto flex items-center gap-2">
            <Icon icon={Eye} />
            <span className="text-sm">Visibility</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="surface flex flex-col justify-between space-y-2.5 rounded-3xl p-4">
          <div className="mr-auto flex items-center gap-2">
            <Icon icon={Sun} />
            <span className="text-sm">UV Index</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="surface flex flex-col justify-between space-y-2.5 rounded-3xl p-4">
          <div className="mr-auto flex items-center gap-2">
            <Icon icon={CloudRain} />
            <span className="text-sm">Precipitation</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
