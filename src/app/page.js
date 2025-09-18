import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadForm from "@/components/UploadForm";
import InfoSection from "@/components/InfoSection";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Hero section */}
        <div className="text-center max-w-4xl mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Convertidor de Imágenes Profesional
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-4 leading-relaxed">
            Convierte tus imágenes a <strong className="text-blue-600">WebP, PNG, JPEG o AVIF</strong> de forma
            rápida, segura y completamente gratuita.
          </p>
          <p className="text-gray-600 text-base md:text-lg">
            Arrastra tu archivo o haz clic para seleccionarlo y comienza la conversión en segundos.
          </p>
        </div>

        {/* Upload form - central functionality */}
        <div className="mb-12">
          <UploadForm />
        </div>

        {/* Ad banner */}
        <div className="mb-8 w-full flex justify-center">
          <AdBanner />
        </div>

        {/* Information section */}
        <InfoSection />
      </main>
      
      <Footer />
    </div>
  );
}
