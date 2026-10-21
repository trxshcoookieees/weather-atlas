"use client";

import { cn } from "@/lib/utils";
import { Navigation } from "@/components/layout/navigation";
import { useMobileSidebar } from "@/context/mobile-sidebar-context";
import React from "react";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen, closeSidebar } = useMobileSidebar();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-55 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div>
        <aside
          id="sidebar"
          role="navigation"
          aria-label="Main navigation"
          aria-hidden={!isOpen ? undefined : undefined}
          className={cn(
            "fixed inset-y-0 left-0 z-60 h-dvh w-60 space-y-4 overflow-y-auto bg-stone-200/95 px-4 py-7 shadow-xl backdrop-blur-xl transition-transform duration-300 ease-in-out dark:bg-gray-700/95",
            isOpen ? "translate-x-0" : "-translate-x-full",
            "lg:sticky lg:top-0 lg:z-auto lg:block lg:h-dvh lg:shrink-0 lg:translate-x-0 lg:overflow-visible lg:bg-transparent lg:shadow-none lg:backdrop-blur-none",
          )}
        >
          {children}
          <Navigation />
        </aside>
      </div>
    </>
  );
}
