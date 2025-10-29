export const metadata = {
  title: "Acerca de",
  description:
    "Conoce el propósito del sitio, cómo funciona el convertidor y quién está detrás del proyecto.",
};

export default function Acerca() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10 sm:py-14 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Acerca de</h1>
        <p>
          Este sitio ofrece una herramienta sencilla para convertir imágenes a formatos modernos
          como WebP, PNG, JPEG, AVIF y PDF (unificando varias imágenes). Nuestro objetivo es
          facilitar flujos de trabajo cotidianos con una interfaz clara, rápida y segura.
        </p>
        <p>
          Cuidamos la experiencia de usuario y el rendimiento: límites razonables de subida,
          validaciones útiles y respuestas descargables al instante. La compresión y conversión
          se realizan con librerías de alta calidad ampliamente usadas en producción.
        </p>
        <p>
          Si tienes preguntas o sugerencias, estaremos encantados de escucharte. Encontrarás
          nuestro correo de contacto en el pie de página.
        </p>
      </div>
    </section>
  );
}