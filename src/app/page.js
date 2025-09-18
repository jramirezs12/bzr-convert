import UploadForm from "@/components/UploadForm";
import AdBanner from "@/components/AdBanner";
import InfoSection from "@/components/InfoSection";
import LabelsBar from "@/components/LabelsBar";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      {/* Stack vertical que controla TODOS los espacios entre componentes */}
      <div className="w-full px-4 pt-14 sm:pt-16 flex flex-col items-center gap-y-10 sm:gap-y-14 lg:gap-y-16">
        {/* Spacer para separar del header fijo */}
        <div aria-hidden="true" className="h-24 sm:h-28 lg:h-0" />

        {/* Hero (título + descripción + chips) */}
        <div className="w-full max-w-3xl flex flex-col items-center text-center mt-6 sm:mt-8 gap-y-3 sm:gap-y-4 md:gap-y-5">
          <h1 className="w-full text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Convertidor de Imágenes
            </span>
          </h1>

          <p className="w-full text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200">
            Convierte tus imágenes a{" "}
            <strong className="font-semibold">WebP, PNG, JPEG o AVIF</strong> en
            segundos.
          </p>

          <p className="w-full text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Arrastra y suelta tus archivos o haz clic en{" "}
            <span className="font-medium">Agregar imágenes</span>.
          </p>

          <div className="w-full flex justify-center">
            <LabelsBar />
          </div>
        </div>
        {/* Convertidor */}
        <div className="w-full flex justify-center">
          <UploadForm />
        </div>

        {/* Ad 1 */}
        <AdBanner />

        {/* Tarjetas informativas */}
        <div className="w-full flex justify-center">
          <InfoSection />
        </div>

        {/* Ad 2 */}
        <AdBanner />
      </div>
    </div>
  );
}
