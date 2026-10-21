import { Skeleton } from "@/components/ui/skeleton";

export function CityInfoSkeleton() {
  return (
    <section className="flex h-17 items-center sm:h-12 sm:justify-between md:h-14">
      <div className="mr-4">
        <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline-last sm:gap-0">
          <Skeleton className="mr-2 h-7 w-30 md:h-9 md:w-36" />
          <Skeleton className="h-5 w-42" />
        </div>
        <Skeleton className="h-4 w-52" />
      </div>
    </section>
  );
}
