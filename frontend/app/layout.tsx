import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="flex h-full overflow-hidden bg-linear-to-br from-stone-200 from-20% via-stone-300 to-zinc-300 font-sans text-neutral-800 dark:from-gray-600 dark:via-gray-500 dark:to-gray-400 dark:text-neutral-200">
        {children}
      </body>
    </html>
  );
}
