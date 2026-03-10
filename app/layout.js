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
  metadataBase: new URL("https://reshuksapkota.com.np"),
  title: {
    default: "Reshuk Sapkota — Developer & Builder",
    template: "%s | Reshuk Sapkota",
  },
  description:
    "Full-stack developer building tools, apps, and digital experiences. Crafting with Next.js, React, and a love for clean design.",
  keywords: [
    "Reshuk Sapkota",
    "developer",
    "portfolio",
    "Next.js",
    "full-stack",
    "Nepal",
    "software engineer",
    "builder",
  ],
  authors: [{ name: "Reshuk Sapkota" }],
  creator: "Reshuk Sapkota",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reshuksapkota.com.np",
    siteName: "Reshuk Sapkota",
    title: "Reshuk Sapkota — Developer & Builder",
    description:
      "Full-stack developer building tools, apps, and digital experiences. Crafting with Next.js, React, and a love for clean design.",
    images: [
      {
        url: "/opengraph-image", // Next.js will automatically handle this
        width: 1200,
        height: 630,
        alt: "Reshuk Sapkota — Developer & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reshuk Sapkota — Developer & Builder",
    description:
      "Full-stack developer building tools, apps, and digital experiences. Crafting with Next.js, React, and a love for clean design.",
    creator: "@reshuk_sapkota",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "https://reshuksapkota.com.np",
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
