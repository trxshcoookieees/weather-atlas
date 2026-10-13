import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/ui";

type WeatherMetricProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
};

export function WeatherMetric(props: WeatherMetricProps): React.ReactNode {
  return (
    <div className="surface space-y-2.5 rounded-2xl p-4 md:rounded-3xl">
      <div className="mr-auto flex items-center justify-center gap-2 sm:justify-between">
        <Icon icon={props.icon} />
        <span className="hidden text-sm sm:inline">{props.label}</span>
      </div>
      <div className="mt-auto flex flex-col items-center justify-center sm:flex-row sm:justify-between">
        <span className="text-xs font-semibold sm:text-base md:text-xl">
          {props.value}
        </span>
        <span className="hidden text-xs text-neutral-600 sm:inline sm:text-sm dark:text-neutral-300">
          {props.detail}
        </span>
      </div>
    </div>
  );
}
