import UploadForm from "@/components/UploadForm";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-3">Convertidor de Imágenes</h1>
        <p className="text-gray-600 mb-6">
          Convierte tus imágenes a <strong>WebP, PNG, JPEG o AVIF</strong> en
          segundos. Arrastra tu archivo o haz clic para seleccionarlo.
        </p>
      </div>

      <UploadForm />

      <div className="mt-6 w-full flex justify-center">
        <AdBanner />
      </div>
    </main>
  );
}
