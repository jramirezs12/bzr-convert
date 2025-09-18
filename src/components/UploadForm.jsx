"use client";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("webp");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Selecciona un archivo");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    const res = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `convertido.${format}`;
      link.click();
    } else {
      alert("Error al convertir la imagen");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-3xl p-8 max-w-2xl w-full flex flex-col items-center border border-gray-100 backdrop-blur-sm"
    >
      {/* Zona de drag & drop */}
      <label className="w-full h-56 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group">
        <div className="text-center">
          {file ? (
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">📁</span>
              <span className="text-gray-700 font-medium text-lg">{file.name}</span>
              <span className="text-gray-500 text-sm mt-1">Archivo seleccionado</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">📸</span>
              <span className="text-gray-600 font-medium text-lg mb-2">
                Arrastra tu imagen aquí o haz clic
              </span>
              <span className="text-gray-500 text-sm">
                Soporta JPG, PNG, GIF, BMP, TIFF (máx. 10MB)
              </span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      {/* Selector de formato */}
      <div className="w-full mt-6">
        <label className="block text-gray-700 font-semibold mb-3 text-lg">
          Formato de salida:
        </label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="webp">WebP - Ideal para web (menor tamaño)</option>
          <option value="png">PNG - Con transparencia</option>
          <option value="jpeg">JPEG - Para fotografías</option>
          <option value="avif">AVIF - Máxima compresión</option>
        </select>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading || !file}
        className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Convirtiendo...
          </div>
        ) : (
          "🚀 Convertir Imagen"
        )}
      </button>
      
      {file && (
        <p className="mt-4 text-gray-600 text-sm text-center">
          ✨ Archivo listo para convertir a formato {format.toUpperCase()}
        </p>
      )}
    </form>
  );
}
