import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "PNG vs. JPEG vs. AVIF: ¿Cuál es el mejor formato para cada caso?",
  description:
    "Comparativa práctica entre PNG, JPEG y AVIF. Calidad, peso, transparencia, compatibilidad y recomendaciones por tipo de contenido.",
};

export default function ArticleCompare() {
  return (
    <article className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10 sm:py-14 space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            PNG vs. JPEG vs. AVIF: ¿Cuál es el mejor formato para cada caso?
          </h1>
          <p className="text-sm text-gray-500">Actualizado: {new Date("2025-01-02").toLocaleDateString("es-ES")}</p>
        </header>

        <p>
          Elegir el formato adecuado impacta directamente en la velocidad de carga, la nitidez
          visual y la compatibilidad. PNG brilla en gráficos con texto y transparencias, JPEG
          es el caballo de batalla para fotografía gracias a su compatibilidad y AVIF ofrece
          compresión de última generación con resultados espectaculares, aunque su codificación
          puede ser más lenta en algunos entornos. La decisión correcta depende del contenido,
          del público objetivo y de los objetivos de rendimiento de tu sitio.
        </p>

        <AdBanner />

        <h2 className="text-xl font-semibold">PNG: precisión y transparencia</h2>
        <p>
          PNG utiliza compresión sin pérdida. Es idóneo para logotipos, capturas de pantalla,
          UI y gráficos con bordes definidos. Su soporte de transparencia (alfa) es robusto,
          pero los archivos pueden ser pesados. Evítalo para fotografías a pantalla completa,
          donde el tamaño crecerá rápidamente.
        </p>

        <h2 className="text-xl font-semibold">JPEG: compatibilidad universal</h2>
        <p>
          JPEG usa compresión con pérdida, balanceando calidad y tamaño. Para fotografía web,
          sigue siendo una opción sólida, con compatibilidad excelente. Ajusta la calidad
          (70–85) para un buen equilibrio y evita recomprimir múltiples veces para no degradar
          la imagen progresivamente.
        </p>

        <h2 className="text-xl font-semibold">AVIF: lo último en compresión</h2>
        <p>
          AVIF aprovecha el códec AV1 para lograr tasas de compresión superiores incluso a WebP,
          con muy buena calidad perceptual y soporte de HDR en algunos casos. Es ideal para sitios
          muy orientados al rendimiento. Asegura un fallback a WebP/JPEG si tu público usa
          navegadores antiguos y evalúa el costo de CPU al codificar en tu pipeline.
        </p>

        <h2 className="text-xl font-semibold">Recomendaciones rápidas</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Logos/íconos/UI: PNG o SVG.</li>
          <li>Fotografía: AVIF si es posible, WebP como segunda opción, JPEG como fallback.</li>
          <li>Transparencias complejas: WebP (lossless) o PNG optimizado.</li>
          <li>Compatibilidad máxima sin sorpresas: JPEG/PNG.</li>
        </ul>

        <p>
          En la práctica, muchas plataformas sirven múltiples formatos mediante <code>&lt;picture&gt;</code>
          y negociación de contenido. Así garantizas la mejor relación calidad/peso para cada visitante.
        </p>
      </div>
    </article>
  );
}