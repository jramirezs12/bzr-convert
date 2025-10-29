import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "5 consejos para optimizar las imágenes de tu sitio y mejorar el SEO",
  description:
    "Buenas prácticas accionables para tamaño, formato, lazy-load, atributos HTML y automatización. Mejora tus Core Web Vitals.",
};

export default function ArticleSEO() {
  return (
    <article className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10 sm:py-14 space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            5 consejos para optimizar las imágenes de tu sitio y mejorar el SEO
          </h1>
          <p className="text-sm text-gray-500">Actualizado: {new Date("2025-01-03").toLocaleDateString("es-ES")}</p>
        </header>

        <p>
          La optimización de imágenes es uno de los pilares más efectivos para mejorar el
          rendimiento web. Reduce el peso sin sacrificar calidad, evita saltos de layout y
          acelera el renderizado. Estos cinco consejos te ayudarán a mejorar Core Web Vitals
          (LCP, CLS, INP) y a ofrecer una experiencia más fluida a tus usuarios.
        </p>

        <AdBanner />

        <h2 className="text-xl font-semibold">1) Usa el formato correcto</h2>
        <p>
          Prefiere AVIF o WebP para la mayoría de las fotos. Mantén PNG para elementos con
          texto nítido o transparencia que requiera precisión. Conserva SVG para gráficos
          vectoriales escalables.
        </p>

        <h2 className="text-xl font-semibold">2) Sirve el tamaño exacto</h2>
        <p>
          Evita enviar imágenes 3x más grandes que el contenedor. Genera variantes por
          breakpoint y densidad de píxeles, o usa <code>next/image</code> si estás en Next.js.
        </p>

        <h2 className="text-xl font-semibold">3) Añade dimensiones y lazy-load</h2>
        <p>
          Define <code>width</code> y <code>height</code> para evitar CLS. Habilita lazy-loading
          en imágenes fuera de pantalla para mejorar el tiempo de interacción.
        </p>

        <h2 className="text-xl font-semibold">4) Cuida el texto alternativo</h2>
        <p>
          Usa <code>alt</code> descriptivos que aporten contexto accesible y semántico.
          Esto ayuda a SEO y a tecnologías de asistencia.
        </p>

        <h2 className="text-xl font-semibold">5) Automatiza tu pipeline</h2>
        <p>
          Integra compresión en tu CI/CD, usa un CDN con transformación de imágenes o herramientas
          como Sharp. Establece parámetros por defecto de calidad y formatos preferidos.
        </p>

        <p>
          Adoptar estas prácticas de forma consistente impulsa la velocidad, la accesibilidad
          y la satisfacción de los usuarios, lo que suele correlacionar con mejores posiciones
          orgánicas a medio plazo.
        </p>
      </div>
    </article>
  );
}