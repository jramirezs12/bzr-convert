export const metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del servicio de conversión de imágenes proporcionado por este sitio.",
};

export default function Terminos() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10 sm:py-14 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Términos y Condiciones</h1>

        <h2 className="text-xl font-semibold">1. Aceptación</h2>
        <p>
          Al utilizar este sitio aceptas estos Términos y Condiciones. Si no estás de acuerdo,
          por favor no uses el servicio.
        </p>

        <h2 className="text-xl font-semibold">2. Uso permitido</h2>
        <p>
          El servicio se ofrece “tal cual” para convertir imágenes a los formatos soportados.
          No debes usarlo para fines ilegales, infringir derechos de terceros ni cargar
          contenido que viole la ley aplicable.
        </p>

        <h2 className="text-xl font-semibold">3. Propiedad intelectual</h2>
        <p>
          Conservas los derechos sobre tus archivos. Eres responsable de contar con las
          autorizaciones necesarias para procesarlos.
        </p>

        <h2 className="text-xl font-semibold">4. Disponibilidad del servicio</h2>
        <p>
          Podríamos interrumpir o modificar el servicio sin previo aviso por mantenimiento
          u otras razones técnicas. No garantizamos disponibilidad continua.
        </p>

        <h2 className="text-xl font-semibold">5. Limitación de responsabilidad</h2>
        <p>
          En la medida permitida por la ley, no seremos responsables por pérdidas directas o
          indirectas derivadas del uso o la imposibilidad de uso del servicio.
        </p>

        <h2 className="text-xl font-semibold">6. Cambios en los términos</h2>
        <p>
          Podemos actualizar estos términos periódicamente. Te recomendamos revisarlos de forma
          regular.
        </p>
      </div>
    </section>
  );
}