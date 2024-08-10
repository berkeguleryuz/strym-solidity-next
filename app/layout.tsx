import type { Metadata } from "next";

import "./globals.css";
import { Orbitron } from "next/font/google";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const font = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <Nav />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
