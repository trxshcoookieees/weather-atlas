import { Sidebar, Header } from "@/components/layout";
import WeatherRefresh from "@/components/weather/WeatherRefresh";
import { CityInfo } from "@/components/layout";
import { CityProvider } from "@/providers/CityProvider";
import { WeatherProvider } from "@/providers/WeatherProvider";
import { MobileSidebarProvider } from "@/providers/MobileSidebarProvider";

export default function WeatherLayout({ children }: LayoutProps<"/">) {
  return (
    <CityProvider>
      <WeatherProvider>
        <MobileSidebarProvider>
          <Sidebar />
          <main className="relative mx-auto flex h-full w-full min-w-0 flex-1 flex-col overflow-y-auto">
            <Header />
            <WeatherRefresh>
              <CityInfo />
              <div className="space-y-6 px-8 pt-7">{children}</div>
            </WeatherRefresh>
          </main>
        </MobileSidebarProvider>
      </WeatherProvider>
    </CityProvider>
  );
}
