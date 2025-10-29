export const metadata = {
  title: "Política de Privacidad",
  description:
    "Información sobre el tratamiento de datos, cookies y terceros en este sitio.",
};

export default function Privacidad() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10 sm:py-14 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Política de Privacidad</h1>

        <p>
          Respetamos tu privacidad. Este sitio no solicita ni requiere la creación de cuentas
          de usuario. Los archivos que subes se procesan con el único fin de convertirlos al
          formato que elijas. No vendemos, alquilamos ni cedemos información personal a terceros.
        </p>

        <h2 className="text-xl font-semibold">Datos que tratamos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Archivos subidos: se usan exclusivamente para la conversión solicitada y no se
            emplean para otro propósito.
          </li>
          <li>
            Métricas técnicas y analíticas: podemos usar herramientas de terceros para medir
            tráfico y rendimiento a nivel agregado.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">Cookies y tecnologías similares</h2>
        <p>
          Este sitio puede usar cookies necesarias para su funcionamiento y cookies/tecnologías
          de terceros con fines analíticos o publicitarios. Puedes administrar las cookies desde
          la configuración de tu navegador.
        </p>

        <h2 className="text-xl font-semibold">Publicidad</h2>
        <p>
          Mostramos anuncios en determinadas páginas del blog. Los proveedores pueden usar
          cookies para mostrar anuncios relevantes. Consulta sus políticas para más detalles.
        </p>

        <h2 className="text-xl font-semibold">Terceros</h2>
        <p>
          Podemos integrar servicios como redes de anuncios o analítica. Cada servicio tiene
          su propia política de privacidad. Te recomendamos revisarlas si deseas más información.
        </p>

        <h2 className="text-xl font-semibold">Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política, contáctanos a través del correo indicado en
          el pie de página.
        </p>
      </div>
    </section>
  );
}