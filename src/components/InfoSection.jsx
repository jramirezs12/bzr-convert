export default function InfoSection() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* How it works section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border border-blue-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          ¿Cómo funciona bzr-convert?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Selecciona tu imagen</h3>
            <p className="text-gray-600 text-sm">
              Arrastra y suelta o haz clic para seleccionar la imagen que deseas convertir
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Elige el formato</h3>
            <p className="text-gray-600 text-sm">
              Selecciona entre WebP, PNG, JPEG o AVIF según tus necesidades
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Descarga el resultado</h3>
            <p className="text-gray-600 text-sm">
              Tu imagen convertida se descargará automáticamente en segundos
            </p>
          </div>
        </div>
      </div>

      {/* Features and recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="text-2xl mr-2">✨</span>
            Características
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Conversión rápida y sin pérdida de calidad</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Soporte para múltiples formatos populares</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>100% gratuito y sin registro requerido</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Procesamiento seguro en el servidor</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            Recomendaciones
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>• <strong>WebP:</strong> Ideal para web, menor tamaño con buena calidad</li>
            <li>• <strong>PNG:</strong> Perfecto para imágenes con transparencia</li>
            <li>• <strong>JPEG:</strong> Excelente para fotografías y tamaño reducido</li>
            <li>• <strong>AVIF:</strong> Formato moderno con máxima compresión</li>
            <li>• Tamaño máximo recomendado: 10MB por imagen</li>
            <li>• Formatos soportados: JPG, PNG, GIF, BMP, TIFF</li>
          </ul>
        </div>
      </div>
    </div>
  );
}