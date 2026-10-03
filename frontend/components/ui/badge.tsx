import type { LucideIcon } from "lucide-react";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  icon?: LucideIcon;
  iconClassName?: string;
  children?: React.ReactNode;
  variant?: "default" | "pill" | "defaultMuted" | "pillMuted";
  className?: string;
};

const variants = {
  default: "rounded-lg surface text-slate-600",
  pill: "rounded-full surface text-slate-600 max-h-8",
  defaultMuted: "rounded-lg surface-muted text-cyan-900",
  pillMuted: "rounded-full surface-muted text-cyan-900 max-h-8",
};

export function Badge({
  icon,
  iconClassName,
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-max items-center gap-2 px-3 py-2",
        variants[variant],
        className,
      )}
    >
      {icon && <Icon icon={icon} className={iconClassName} />}
      {children}
    </div>
  );
}
