"use client";

import { useMobileSidebar } from "@/context/mobile-sidebar-context";
import { Icon } from "@/components/ui/icon";
import { List } from "lucide-react";

function SidebarToggle() {
  const { openSidebar } = useMobileSidebar();

  return (
    <button
      type="button"
      onClick={openSidebar}
      aria-label="Open navigation menu"
      aria-controls="sidebar"
      className="flex size-10 shrink-0 items-center justify-center rounded-lg surface transition-colors hover:bg-black/5 lg:hidden dark:hover:bg-white/10"
    >
      <Icon icon={List} />
    </button>
  );
}

export default SidebarToggle;
