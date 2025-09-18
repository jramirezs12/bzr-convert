import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "bzr-convert - Convertidor de Imágenes Online",
  description: "Convierte tus imágenes a WebP, PNG, JPEG y AVIF de forma gratuita y rápida. Herramienta profesional para conversión de imágenes online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
