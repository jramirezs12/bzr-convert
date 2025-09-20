import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/lib/constants";
import { ENV } from "@/lib/env";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: SEO.title,
  description: SEO.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Meta recomendado por AdSense para verificación */}
        <meta name="google-adsense-account" content={ENV.ADSENSE_CLIENT} />

        {/* Script de AdSense. Úsalo con beforeInteractive para que quede en <head> y cargue temprano */}
        <Script
          id="adsense-script"
          strategy="beforeInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
            ENV.ADSENSE_CLIENT
          )}`}
          crossOrigin="anonymous"
        />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="rj8SZwvhYGP/WmPe5XEDaQ" async></script>
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}