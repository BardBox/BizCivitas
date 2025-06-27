import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import PWAInstaller from "@/components/PWAInstaller";
import { GoogleTagManager } from '@next/third-parties/google'
// import { Poppins } from "next/font/google";s
import { Raleway } from "next/font/google";
import ClientPixelTracker from "@/components/Ads/ClientPixelTracker"
// Enhanced ISR configuration for layout
export const revalidate = 3600; // 1 hour for layout components

const geistSans = Raleway({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Raleway({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "BizCivitas - Turning Visions Into Reality, One Event at a Time",
    template: "%s | BizCivitas"
  },
  description: "Bringing your vision to life with seamless execution and unforgettable experiences. Join BizCivitas for networking, events, memberships and business growth opportunities.",
  keywords: ["BizCivitas", "business networking", "events", "memberships", "entrepreneur networking", "corporate networking", "business community", "professional development"],
  authors: [{ name: "BizCivitas" }],
  creator: "BizCivitas",
  publisher: "BizCivitas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bizcivitas.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BizCivitas - Turning Visions Into Reality, One Event at a Time",
    description: "Bringing your vision to life with seamless execution and unforgettable experiences. Join BizCivitas for networking, events, memberships and business growth opportunities.",
    url: 'https://bizcivitas.com',
    siteName: 'BizCivitas',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BizCivitas - Business Networking Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BizCivitas - Turning Visions Into Reality, One Event at a Time",
    description: "Bringing your vision to life with seamless execution and unforgettable experiences.",
    images: ['/og-image.jpg'],
    creator: '@bizcivitas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GLx4Nhk4-Y9xOj91-PGao0xQfA_QpPqpcj19W8nKaP8',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a202c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BizCivitas" />
        <link rel="apple-touch-icon" href="/bizcivitas.svg" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '727341753116820');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=727341753116820&ev=
            PageView&noscript=1"/>
        </noscript>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M85WZNMH');`}
        </Script>

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BizCivitas",
              "url": "https://bizcivitas.com",
              "logo": "https://bizcivitas.com/logo.png",
              "description": "Bringing your vision to life with seamless execution and unforgettable experiences. Professional business networking platform.",
              "sameAs": [
                "https://linkedin.com/company/bizcivitas",
                "https://twitter.com/bizcivitas",
                "https://facebook.com/bizcivitas"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "event": [
                {
                  "@type": "BusinessEvent",
                  "name": "Quarterly Business Summit 2024",
                  "startDate": "2024-03-15",
                  "location": {
                    "@type": "Place",
                    "name": "Grand Convention Center, NYC"
                  },
                  "organizer": {
                    "@type": "Organization",
                    "name": "BizCivitas"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M85WZNMH"
            height="0"
            width="0"
          />
        </noscript>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=GTM-M85WZNMH`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-M85WZNMH', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              send_page_view: true
            });
          `}
        </Script>

        {/* Service Worker Registration */}
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
        <PWAInstaller />
        <GoogleTagManager gtmId="GTM-M85WZNMH" />
        <ClientPixelTracker/>
        <Navbar />
        <main className={`min-h-screen ${geistSans.className}`} >
          {children}
        </main>
        <div className="z-10 relative">
          <Footer />
        </div>

      </body>
    </html>
  );
}