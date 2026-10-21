"use client";

import { createContext, useContext } from "react";

type MobileSidebarContextValue = {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export const MobileSidebarContext =
  createContext<MobileSidebarContextValue | null>(null);

export function useMobileSidebar() {
  const context = useContext(MobileSidebarContext);

  if (!context) {
    throw new Error(
      "useMobileSidebarContext must be used within MobileSidebarProvider",
    );
  }

  return context;
}
