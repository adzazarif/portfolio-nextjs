import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Adza Zarif Nur Iskandar | Fullstack Developer",
    template: "%s | Adza Zarif Nur Iskandar"
  },
  description: "Experienced Fullstack Developer specializing in React, Next.js, Node.js, and modern web technologies. Creating innovative digital solutions with clean code and exceptional user experience.",
  keywords: [
    "Fullstack Developer",
    "React Developer", 
    "Next.js Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Web Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Adza Zarif Nur Iskandar"
  ],
  authors: [{ name: "Adza Zarif Nur Iskandar" }],
  creator: "Adza Zarif Nur Iskandar",
  publisher: "Adza Zarif Nur Iskandar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://adza-zarif.my.id"), // Ganti dengan domain Anda
  alternates: {
    canonical: "/https://adza-zarif.my.id",
  },
  openGraph: {
    title: "Adza Zarif Nur Iskandar | Fullstack Developer",
    description: "Experienced Fullstack Developer specializing in React, Next.js, Node.js, and modern web technologies. Creating innovative digital solutions with clean code and exceptional user experience.",
    url: "https://adza-zarif.my.id", // Ganti dengan domain Anda
    siteName: "Adza Zarif Nur Iskandar - Portfolio",
    images: [
      {
        url: "/og-image.png", // Pastikan Anda memiliki gambar ini
        width: 1200,
        height: 630,
        alt: "Adza Zarif Nur Iskandar - Fullstack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adza Zarif Nur Iskandar | Fullstack Developer",
    description: "Experienced Fullstack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/og-image.png"], // Pastikan Anda memiliki gambar ini
    creator: "@adzazarifnur", 
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  applicationName: "Adza Zarif Portfolio",
  appleWebApp: {
    capable: true,
    title: "Adza Zarif Portfolio",
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.country" content="Indonesia" />
        <link rel="icon" href="/images/icon.png" />
        
        {/* Structured data for better search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Adza Zarif Nur Iskandar",
              "jobTitle": "Fullstack Developer",
              "description": "Experienced Fullstack Developer specializing in React, Next.js, Node.js, and modern web technologies",
              "url": "https://adza-zarif.my.id",
              "sameAs": [
                "https://github.com/adzazarif",
                "https://linkedin.com/in/adzazarif",
                "https://twitter.com/adzazarifnur"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Web Development",
                "Software Engineering"
              ],
              "alumniOf": "Your University", // Opsional
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Indonesia"
              }
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        >
          Skip to main content
        </a>
        
        <main id="main-content">
          {children}
        </main>
        
        {/* Analytics script placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
      </body>
    </html>
  );
}