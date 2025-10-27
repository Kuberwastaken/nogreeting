import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nogreeting.kuber.studio"),
  title: {
    default: "No Greeting - Stop saying just hello in chat",
    template: "%s | No Greeting",
  },
  description:
    "Generate custom pages to politely ask people not to send just a greeting in chat. Inspired by nohello.net. Created by Kuber Mehta.",
  keywords: [
    "no greeting",
    "no hello",
    "chat etiquette",
    "communication",
    "messaging",
    "productivity",
    "direct communication",
    "workplace communication",
    "slack etiquette",
    "discord etiquette",
    "teams etiquette",
    "async communication",
  ],
  authors: [
    {
      name: "Kuber Mehta",
      url: "https://kuber.studio",
    },
  ],
  creator: "Kuber Mehta",
  publisher: "Kuber Mehta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "No Greeting - Stop saying just hello in chat",
    description: "Generate custom pages to politely ask people not to send just a greeting in chat. Inspired by nohello.net",
    url: "https://nogreeting.kuber.studio",
    siteName: "No Greeting",
    locale: "en_US",
    images: [
      {
        url: "/embed-image.jpg",
        width: 1200,
        height: 630,
        alt: "No Greeting - Stop saying just hello in chat",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "No Greeting - Stop saying just hello in chat",
    description: "Generate custom pages to politely ask people not to send just a greeting in chat. Inspired by nohello.net",
    images: ["/embed-image.jpg"],
    creator: "@kuberwastaken",
    site: "@kuberwastaken",
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
  alternates: {
    canonical: "https://nogreeting.kuber.studio",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H6NCRPT736"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H6NCRPT736');
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased ${_merriweather.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
