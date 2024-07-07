
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

// const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_Malayalam({subsets: ["latin","malayalam"]})

export const metadata: Metadata = {
  title: "GreenCleanEarth",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
      <Toaster />
        {children}
        </body>
    </html>
  );
}
