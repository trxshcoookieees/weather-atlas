import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = LucideProps & {
  icon: LucideIcon;
};

export function Icon({ icon: IconComponent, className, ...props }: IconProps) {
  return <IconComponent {...props} className={cn("size-4.5", className)} />;
}
