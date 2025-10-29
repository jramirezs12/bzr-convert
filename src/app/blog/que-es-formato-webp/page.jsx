import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "¿Qué es el formato WebP y por qué deberías usarlo en tu web?",
  description:
    "WebP combina gran compresión con calidad visual, soporte de transparencia y animación. Ventajas, compatibilidad y recomendaciones prácticas.",
};

export default function ArticleWebP() {
  return (
    <article className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10 sm:py-14 space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            ¿Qué es el formato WebP y por qué deberías usarlo en tu web?
          </h1>
          <p className="text-sm text-gray-500">Actualizado: {new Date("2025-01-01").toLocaleDateString("es-ES")}</p>
        </header>

        <p>
          WebP es un formato de imagen desarrollado por Google que ofrece tasas de compresión
          superiores a JPEG y PNG, manteniendo una calidad visual muy alta. Soporta tanto
          compresión con pérdida como sin pérdida, así como transparencia (canal alfa) y
          animaciones. En entornos web modernos, esto se traduce en páginas que cargan más
          rápido, mejor puntuación en Core Web Vitals y una experiencia más ágil en redes
          móviles. Por ello, es un formato clave para cualquier estrategia de optimización
          de imágenes orientada a SEO técnico y rendimiento.
        </p>

        <AdBanner />

        <h2 className="text-xl font-semibold">Ventajas principales</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Compresión avanzada: en muchas pruebas, WebP produce archivos entre un 25% y 35%
            más pequeños que JPEG a la misma calidad percibida.
          </li>
          <li>
            Transparencia: a diferencia de JPEG, WebP permite fondos transparentes similares a PNG,
            manteniendo pesos más bajos.
          </li>
          <li>
            Animación: puede reemplazar GIFs animados con mejores tasas de compresión y color.
          </li>
          <li>
            Soporte generalizado: la compatibilidad en navegadores es muy amplia en 2025.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Cuándo usar WebP</h2>
        <p>
          Es ideal para imágenes decorativas, fotografías, banners y gráficos con
          transparencia. Para iconos vectoriales, SVG sigue siendo mejor. Para casos en los
          que necesites compatibilidad extrema con navegadores muy antiguos, puedes
          combinar WebP con un fallback en JPEG/PNG servido por el servidor o un
          <code> &lt;picture&gt; </code> con múltiples fuentes.
        </p>

        <h2 className="text-xl font-semibold">Buenas prácticas</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sirve las imágenes en la resolución exacta que necesites, evitando escalado excesivo.</li>
          <li>
            Define <code>width</code> y <code>height</code> en las etiquetas de imagen para evitar CLS.
          </li>
          <li>Habilita la carga diferida (lazy-loading) para imágenes fuera de pantalla.</li>
          <li>Usa un CDN o cachea en el edge para latencia mínima.</li>
        </ul>

        <p>
          En resumen, WebP equilibra calidad y peso de forma excelente y es un pilar sencillo
          para mejorar la velocidad de tu web y, en consecuencia, su posicionamiento orgánico.
        </p>
      </div>
    </article>
  );
}