import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "Cómo reducir el tamaño de una imagen sin perder calidad: Guía completa",
  description:
    "Flujo de trabajo para comprimir imágenes manteniendo nitidez y color. Herramientas, parámetros y formatos recomendados.",
};

export default function ArticleCompress() {
  return (
    <article className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10 sm:py-14 space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Cómo reducir el tamaño de una imagen sin perder calidad: Guía completa
          </h1>
          <p className="text-sm text-gray-500">Actualizado: {new Date("2025-01-04").toLocaleDateString("es-ES")}</p>
        </header>

        <p>
          Reducir el tamaño sin perder calidad visible consiste en aplicar el formato adecuado,
          con parámetros de compresión correctos, a una imagen a la resolución exacta necesaria.
          La clave es encontrar el umbral de calidad perceptual donde el archivo es lo más ligero
          posible sin introducir artefactos evidentes (banding, halos, ruido o pérdida de detalle).
        </p>

        <AdBanner />

        <h2 className="text-xl font-semibold">Paso 1: elige el formato</h2>
        <p>
          Para fotografía, empieza por AVIF o WebP. Si necesitas compatibilidad universal,
          usa JPEG como fallback. Para elementos con transparencia y bordes definidos, PNG
          (o WebP lossless) funcionará mejor.
        </p>

        <h2 className="text-xl font-semibold">Paso 2: ajusta la resolución</h2>
        <p>
          Genera la imagen al tamaño exacto de su contenedor. Subir imágenes enormes y
          escalar con CSS desperdicia ancho de banda y tiempo de renderizado.
        </p>

        <h2 className="text-xl font-semibold">Paso 3: configura la compresión</h2>
        <p>
          En AVIF/WebP prueba calidades entre 40–60 (escala 0–100) y verifica visualmente.
          En JPEG, 70–85 suele equilibrar bien. Evita múltiples re-guardados con pérdida.
        </p>

        <h2 className="text-xl font-semibold">Paso 4: automatiza</h2>
        <p>
          Implementa un pipeline con Sharp, ImageMagick o servicios gestionados. Automatiza
          perfiles por tipo de contenido para mantener consistencia.
        </p>

        <p>
          Siguiendo este flujo repites con variaciones y validas en dispositivos reales. Así
          obtendrás archivos pequeños con excelente apariencia, mejorando métricas de rendimiento
          y la experiencia para tus usuarios.
        </p>
      </div>
    </article>
  );
}