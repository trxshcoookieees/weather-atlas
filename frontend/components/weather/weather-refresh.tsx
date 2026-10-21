"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

type WeatherRefreshProps = {
  children: React.ReactNode;
};

/**
 * OpenMeteo updates weather data at 0, 15, 30, 45 minutes past the hour.
 * This component syncs refresh requests to those intervals.
 */
export default function WeatherRefresh({ children }: WeatherRefreshProps) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const syncToNextInterval = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ms = now.getMilliseconds();

      // Find next 15-minute mark: 0, 15, 30, 45
      const nextIntervalMinutes =
        Math.ceil((minutes * 60 + seconds * 1000 + ms) / (15 * 60 * 1000)) * 15;
      const minutesUntilNext =
        nextIntervalMinutes - (minutes * 60 + seconds + ms / 1000);

      // Calculate ms until next interval
      const msUntilNext = minutesUntilNext * 60 * 1000;

      // Set timeout to hit the exact 15-minute mark
      timeoutRef.current = setTimeout(() => {
        router.refresh();

        // Then set interval for every 15 minutes
        intervalRef.current = setInterval(
          () => {
            router.refresh();
          },
          15 * 60 * 1000,
        );
      }, msUntilNext);
    };

    syncToNextInterval();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [router]);

  return <>{children}</>;
}
