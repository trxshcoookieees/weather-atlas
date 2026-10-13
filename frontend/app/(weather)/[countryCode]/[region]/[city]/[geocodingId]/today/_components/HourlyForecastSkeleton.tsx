import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";

export function HourlyForecastSkeleton() {
  return (
    <section className="space-y-4 rounded-2xl max-sm:-mx-8 sm:rounded-3xl sm:surface sm:p-4 lg:rounded-4xl lg:py-5.5 xl:p-7">
      <div className="hidden items-end justify-between sm:flex">
        <div>
          <Skeleton className="mb-2 h-6 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Link
          href="#"
          className="text-sm font-semibold text-neutral-600 dark:text-neutral-300"
        >
          Full hourly forecast →
        </Link>
      </div>

      <div className="flex scrollbar-none gap-2.5 overflow-x-auto max-sm:px-8">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton
            key={`hourly-${i}`}
            className="h-28.5 w-39.75 shrink-0 rounded-xl"
          />
        ))}
      </div>
    </section>
  );
}
