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
    <div className="surface space-y-2.5 rounded-3xl p-4">
      <div className="mr-auto flex items-center gap-2">
        <Icon icon={props.icon} />
        <span className="text-sm">{props.label}</span>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="mr-auto text-xl font-semibold">{props.value}</span>
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          {props.detail}
        </span>
      </div>
    </div>
  );
}
