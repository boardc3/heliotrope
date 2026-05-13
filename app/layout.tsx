import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";
import { ADDRESS, PROPERTY, SHORT_ADDRESS, SITE_NAME, SITE_URL } from "./data/property";
import { listingJsonLd } from "./lib/jsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

const title = `${ADDRESS} · A Corona del Mar Duplex Buyer Package`;
const description =
  "A refreshed cinematic showcase for 437 Heliotrope Avenue in Corona del Mar: a two-residence coastal property with village walkability, a completed design package, and Newport Beach context.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EEDF" },
    { media: "(prefers-color-scheme: dark)", color: "#13110E" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${SHORT_ADDRESS}` },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "437 Heliotrope",
    "437 Heliotrope Avenue",
    "Corona del Mar duplex",
    "Corona del Mar real estate",
    "Newport Beach coastal property",
    "CdM village property",
    "two unit Corona del Mar",
    "Heliotrope Avenue Corona del Mar",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  category: "real estate",
  classification: "Real Estate Listing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title, type: "image/png" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  appleWebApp: { capable: true, title: SHORT_ADDRESS, statusBarStyle: "black-translucent" },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Corona del Mar, California",
    "geo.position": `${PROPERTY.coords[1]};${PROPERTY.coords[0]}`,
    ICBM: `${PROPERTY.coords[1]}, ${PROPERTY.coords[0]}`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.mapbox.com" crossOrigin="" />
        <link rel="preconnect" href="https://events.mapbox.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link rel="preload" as="image" href="/img/posters/hero.jpg" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd(SITE_URL)) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-bone focus:px-4 focus:py-3 focus:text-xs focus:uppercase focus:tracking-wider2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
