import { HandIcon, RocketIcon, ShieldIcon, CheckIcon } from "@/components/icons/Icons";

export default function InfoSection() {
  const cards = [
    {
      id: "como-funciona",
      title: "¿Cómo funciona?",
      Icon: HandIcon,
      items: [
        "Arrastra tu imagen o selecciónala desde tu dispositivo.",
        "Elige el formato de salida: WebP, PNG, JPEG o AVIF.",
        "Haz clic en “Convertir imagen” y descarga el resultado.",
      ],
    },
    {
      id: "para-que-sirve",
      title: "¿Para qué sirve?",
      Icon: RocketIcon,
      items: [
        "Optimiza tus imágenes para web y carga más rápido.",
        "Asegura compatibilidad en navegadores y plataformas.",
        "Reduce su peso sin perder la calidad visible.",
      ],
    },
    {
      id: "caracteristicas",
      title: "Características",
      Icon: ShieldIcon,
      items: [
        "Convierte tus imágenes de manera rápida y eficiente usando Sharp en el backend.",
        "Disfruta de una interfaz sencilla, clara y completamente responsiva en todos los dispositivos.",
        "Descarga de forma directa el archivo convertido sin pasos adicionales.",
      ],
    },
  ];

  return (
    <section
      aria-labelledby="info-heading"
      className="
        w-full max-w-7xl mx-auto
        px-8 sm:px-12 lg:px-20
        py-10 sm:py-12 lg:py-14
      "
    >
      {/* Header con espacio entre items y margen extra al final */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-2.5 sm:space-y-3.5">
        <span className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20">
          Guía rápida
        </span>
        <h2 id="info-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Todo claro en 30 segundos
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
          Tres tarjetas, lo esencial para usar el convertidor con confianza.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {cards.map(({ id, title, Icon, items }) => (
          <article
            key={id}
            id={id}
            className="
              relative rounded-3xl overflow-hidden
              p-8 sm:p-10
              bg-white/85 dark:bg-slate-900/70
              border border-gray-200/70 dark:border-gray-800
              shadow-lg shadow-black/5 backdrop-blur
              transition-all duration-300
              hover:shadow-xl hover:shadow-indigo-600/10 hover:border-indigo-400/60
              text-center
              scroll-mt-28
            "
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-sky-500/50 via-indigo-500/60 to-fuchsia-500/50"
            />

            <div className="mx-auto w-full max-w-[38rem] px-5 sm:px-7 lg:px-8" style={{ padding: "28px" }}>
              <div className="flex flex-col items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">{title}</h3>
              </div>

              <div className="h-4 sm:h-5" aria-hidden="true" />

              <ul className="space-y-3.5 sm:space-y-4 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                {items.map((text, i) => (
                  <li key={i} className="flex items-start justify-center gap-3">
                    <CheckIcon className="mt-1.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="max-w-[42ch] text-center">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}