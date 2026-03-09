import { DM_Mono, Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Reshuk Sapkota — Developer & Builder",
  description: "Full-stack developer building tools, apps, and digital experiences. Crafting with Next.js, React, and a love for clean design.",
  keywords: ["Reshuk Sapkota", "developer", "portfolio", "Next.js", "full-stack", "Nepal"],
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport = { themeColor: "#060608" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} ${dmMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
