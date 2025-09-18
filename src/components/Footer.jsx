export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contacto</h3>
            <div className="space-y-2 text-gray-300">
              <p>✉️ Correo: contacto@bzr-convert.com</p>
              <p>🌐 Web: www.bzr-convert.com</p>
              <p>📱 Soporte técnico disponible</p>
            </div>
          </div>
          
          {/* Developer Credits */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Desarrollador</h3>
            <div className="text-gray-300">
              <p className="mb-2">Desarrollado por <strong className="text-white">jramirezs12</strong></p>
              <p className="text-sm">© 2024 bzr-convert. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
          <p>Convierte tus imágenes de forma rápida y segura | Versión 1.0</p>
        </div>
      </div>
    </footer>
  );
}