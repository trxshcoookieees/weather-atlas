import { Skeleton } from "@/components/ui/Skeleton";

export function WeeklyForecastSkeleton() {
  return (
    <div className="w-full space-y-3.5 rounded-4xl surface p-6">
      <div>
        <p className="text-xl font-semibold">7-day Forecast</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Next week
        </p>
      </div>
      <div className="h-64 scrollbar-none divide-y-2 divide-zinc-900/20 overflow-y-scroll">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={`weekly-${i}`} className="py-2.5">
            <Skeleton className="mb-2 h-4 w-16 rounded-sm" />
            <Skeleton className="h-4 w-48 rounded-sm sm:w-64" />
          </div>
        ))}
      </div>
    </div>
  );
}
