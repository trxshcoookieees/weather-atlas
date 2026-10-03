import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar, Header } from "@/components/layout";
import { TemperatureProvider } from "@/components/providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen">
        <TemperatureProvider>
          <Sidebar />
          <main className="mx-auto w-full">
            <Header />
            {children}
          </main>
        </TemperatureProvider>
      </body>
    </html>
  );
}
