import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function HourlyForecastSkeleton() {
  return (
    <section className="space-y-4 rounded-2xl max-sm:-mx-8 sm:rounded-3xl sm:surface sm:p-4 lg:rounded-4xl lg:py-5.5 xl:p-7">
      <div className="hidden items-end justify-between sm:flex">
        <div>
          <p className="text-xl font-semibold">Hourly forecast</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Wind strengthens before a light late-afternoon shower
          </p>
        </div>
        <Link
          href="#"
          className="text-sm font-semibold text-neutral-600 dark:text-neutral-300"
        >
          Full hourly forecast →
        </Link>
      </div>
      <div className="flex scrollbar-none gap-2.5 overflow-x-auto max-sm:px-8">
        <Skeleton className="h-28.5 w-39.75 shrink-0 rounded-xl" />
        <Skeleton className="h-28.5 w-39.75 shrink-0 rounded-xl" />
        <Skeleton className="h-28.5 w-39.75 shrink-0 rounded-xl" />
      </div>
    </section>
  );
}
