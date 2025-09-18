// Lectura de variables de entorno públicas (Next.js)
// Nota: Las que van al navegador deben ser NEXT_PUBLIC_*

export const ENV = {
  ADSENSE_CLIENT: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-0000000000000000",
  ADSENSE_SLOT: process.env.NEXT_PUBLIC_ADSENSE_SLOT || "1234567890",
  ADSENSE_TEST: String(process.env.NEXT_PUBLIC_ADSENSE_TEST || "true") === "true",
};