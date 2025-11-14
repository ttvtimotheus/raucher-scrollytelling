import type { Metadata } from "next";
import "./globals.css";
import { BirthYearProvider } from "@/lib/context/BirthYearContext";

export const metadata: Metadata = {
  title: "Wie du zum Raucher wurdest",
  description:
    "Eine interaktive Reise durch sieben Jahrzehnte Tabakwerbung und ihre Auswirkungen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-bg-dark text-text-primary antialiased">
        <BirthYearProvider>{children}</BirthYearProvider>
      </body>
    </html>
  );
}
