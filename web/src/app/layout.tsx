import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jost = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Hair Division | Takapuna",
  description: "Beautiful hair, thirty years in the making. Hair Division is Raine's Takapuna salon, offering expert cut, colour and care in a calm, unhurried space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Preloader />
        <a className="skip" href="#main-content">Skip to content</a>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
