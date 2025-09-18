import Image from "next/image";
import Link from "next/link";
import { APP } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/80 backdrop-blur dark:bg-gray-900/70 dark:border-gray-800">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1800px] px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo Image Converter"
              width={28}
              height={28}
              priority
            />
            <span className="font-semibold">{APP.name}</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
            <a href="#como-funciona" className="hover:text-gray-900 dark:hover:text-white">
              ¿Cómo funciona?
            </a>
            <a href="#para-que-sirve" className="hover:text-gray-900 dark:hover:text-white">
              ¿Para qué sirve?
            </a>
            <a href="#contacto" className="hover:text-gray-900 dark:hover:text-white">
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}