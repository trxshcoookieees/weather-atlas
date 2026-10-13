import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weather-atlas-virid.vercel.app/"),
  title: {
    default: "Weather Atlas | Weather Forecast",
    template: "%s | Weather Atlas",
  },
  description:
    "Explore current weather, hourly forecasts, and 7-day weather predictions for cities around the world with Weather Atlas",
  applicationName: "Weather Atlas",
  keywords: [
    "weather forecast",
    "current weather",
    "hourly forecast",
    "weekly forecast",
    "weather by city",
    "forecast",
    "weather",
  ],
  openGraph: {
    type: "website",
    siteName: "Weather Atlas",
    title: "Weather Atlas | Weather Forecast",
    description:
      "Explore current weather, hourly forecasts, and 7-day weather predictions for cities around the world with Weather Atlas",
    url: "/",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex h-full flex-col overflow-hidden bg-linear-to-br from-stone-200 from-20% via-stone-300 to-zinc-300 font-sans text-neutral-800 sm:flex-row dark:from-gray-600 dark:via-gray-500 dark:to-gray-400 dark:text-neutral-200">
        {children}
      </body>
    </html>
  );
}
