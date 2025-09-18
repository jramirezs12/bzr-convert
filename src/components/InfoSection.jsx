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
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <span className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/20">
          Guía rápida
        </span>
        <h2 id="info-heading" className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
          Todo claro en 30 segundos
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
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

            {/* Safe container interno */}
            <div className="mx-auto w-full max-w-[38rem] px-5 sm:px-7 lg:px-8" style={{ padding: "28px" }}>
              {/* Icono + título */}
              <div className="flex flex-col items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">{title}</h3>
              </div>

              {/* Spacer tipo <br> entre título e items */}
              <div className="h-4 sm:h-5" aria-hidden="true" />

              {/* Lista */}
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

/* Iconos SVG */
function HandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M9 11V6a1.5 1.5 0 1 1 3 0v5M12 11V5a1.5 1.5 0 1 1 3 0v6M15 11V7a1.5 1.5 0 1 1 3 0v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
function RocketIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M14 4l6 6-6 6-6-6 6-6z" />
      <path strokeWidth="1.6" d="M8 20c0-1.657 1.79-3 4-3s4 1.343 4 3" />
      <circle cx="14" cy="10" r="1.5" />
    </svg>
  );
}
function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
      <path strokeWidth="1.6" d="M9 12l2 2 4-4" />
    </svg>
  );
}
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.426-.006L3.29 9.495a1 1 0 1 1 1.42-1.407l3.09 3.114 6.49-6.53a1 1 0 0 1 1.414.006Z" />
    </svg>
  );
}