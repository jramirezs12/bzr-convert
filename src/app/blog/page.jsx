import Link from "next/link";

const posts = [
  {
    slug: "que-es-formato-webp",
    title: "¿Qué es el formato WebP y por qué deberías usarlo en tu web?",
    excerpt:
      "WebP ofrece compresión avanzada con y sin pérdida, soporte de transparencia y animación. Descubre cuándo usarlo y cómo mejora el rendimiento de tu sitio.",
    date: "2025-01-01",
  },
  {
    slug: "png-vs-jpeg-vs-avif",
    title: "PNG vs. JPEG vs. AVIF: ¿Cuál es el mejor formato para cada caso?",
    excerpt:
      "Comparamos calidad, peso, transparencia, compatibilidad y casos de uso reales para ayudarte a elegir el formato correcto en cada proyecto.",
    date: "2025-01-02",
  },
  {
    slug: "consejos-optimizar-imagenes-seo",
    title: "5 consejos para optimizar las imágenes de tu sitio y mejorar el SEO",
    excerpt:
      "Desde el tamaño y el formato correcto hasta atributos HTML y carga diferida, estas prácticas mejoran Core Web Vitals y la experiencia del usuario.",
    date: "2025-01-03",
  },
  {
    slug: "reducir-tamano-imagen-sin-perder-calidad",
    title: "Cómo reducir el tamaño de una imagen sin perder calidad: Guía completa",
    excerpt:
      "Aprende un flujo de trabajo efectivo para comprimir imágenes manteniendo nitidez y color, incluyendo herramientas, formatos y parámetros recomendados.",
    date: "2025-01-04",
  },
];

export const metadata = {
  title: "Blog de Optimización de Imágenes",
  description:
    "Artículos sobre formatos, compresión y buenas prácticas para optimizar imágenes en la web.",
};

export default function BlogIndex() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-12 sm:py-16">
        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Contenido original y práctico sobre conversión y optimización de imágenes.
          </p>
        </header>

        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/80 dark:bg-slate-900/70 p-5">
              <article>
                <h2 className="text-xl font-semibold">
                  <Link href={`/blog/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.excerpt}</p>
                <div className="mt-3 text-xs text-gray-500">{new Date(p.date).toLocaleDateString("es-ES")}</div>
                <div className="mt-4">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Leer artículo →
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}