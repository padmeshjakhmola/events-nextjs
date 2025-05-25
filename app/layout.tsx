import type { Metadata } from "next";
import { Poppins, Rubik } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Script from "next/script";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "400", "500"],
});

export const metadata: Metadata = {
  title: "Connectify Events",
  description: "Events application where you can create events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            async
          />
        )}
      </head>
      <body className={`${rubik.variable} ${poppins.variable} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
