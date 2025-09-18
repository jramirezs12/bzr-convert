import { APP } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="border-t border-gray-200 bg-white/90 dark:bg-gray-900/90 dark:border-gray-800"
      id="contacto"
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[720px] px-4 py-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Dudas o sugerencias? Escríbenos a{" "}
            <a
              href={`mailto:${APP.supportEmail}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {APP.supportEmail}
            </a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Desarrollado por <strong>{APP.author}</strong> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}