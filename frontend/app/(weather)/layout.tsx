import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import WeatherRefresh from "@/components/weather/weather-refresh";
import Link from "next/link";
import { MobileSidebarProvider } from "@/providers/mobile-sidebar-provider";
import { CityProvider } from "@/providers/city-provider";

export default function WeatherLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <CityProvider>
        <MobileSidebarProvider>
          <Sidebar>
            <div className="items-center space-y-px rounded-lg surface p-4">
              <p className="text-xl font-semibold">Weather Atlas</p>
              <p className="font-mono text-xs text-neutral-600 dark:text-neutral-300">
                Powered by{" "}
                <Link
                  href="https://open-meteo.com/"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open-Meteo
                </Link>
              </p>
            </div>
          </Sidebar>
          <main className="mx-auto flex h-full w-full min-w-0 flex-1 flex-col overflow-x-clip">
            <Header />
            <WeatherRefresh>
              <div className="space-y-6 px-4 pb-8 lg:px-8">{children}</div>
            </WeatherRefresh>
          </main>
        </MobileSidebarProvider>
      </CityProvider>
    </>
  );
}
