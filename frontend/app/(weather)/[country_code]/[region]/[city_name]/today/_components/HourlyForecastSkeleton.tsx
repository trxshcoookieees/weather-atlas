import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";

export function HourlyForecastSkeleton() {
  return (
    <section className="surface space-y-4 rounded-4xl p-5.5">
      <div className="flex items-end justify-between">
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
      <div className="flex gap-2.5">
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton key={`hourly-${i}`} className="h-28.5 w-39.75" />
        ))}
      </div>
    </section>
  );
}
