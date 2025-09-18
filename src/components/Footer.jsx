export default function Footer() {
  return (
    <footer
      className="border-t border-gray-200 bg-white/90 dark:bg-gray-900/90 dark:border-gray-800"
      id="contacto"
    >
      {/* El contenedor del footer se comporta como UploadForm: max-w-[720px] y centrado */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[720px] px-4 py-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Dudas o sugerencias? Escríbenos a{" "}
            <a
              href="mailto:contacto@tu-dominio.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              contacto@tu-dominio.com
            </a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Desarrollado por <strong>jramirezs12</strong> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}