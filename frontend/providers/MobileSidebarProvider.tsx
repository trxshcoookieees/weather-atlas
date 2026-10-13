"use client";

import { useCallback, useEffect, useState } from "react";
import { MobileSidebarContext } from "@/context/MobileSidebarContext";

export function MobileSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSidebar();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeSidebar]);

  return (
    <MobileSidebarContext.Provider
      value={{ isOpen, openSidebar, closeSidebar }}
    >
      {children}
    </MobileSidebarContext.Provider>
  );
}
