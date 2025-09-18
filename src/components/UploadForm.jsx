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
      className="bg-white shadow-md rounded-2xl p-6 max-w-xl w-full flex flex-col items-center border border-gray-200"
    >
      {/* Zona de drag & drop */}
      <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition">
        <span className="text-gray-500">
          {file ? file.name : "Arrastra tu imagen aquí o haz clic"}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      {/* Selector de formato */}
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="mt-4 border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300"
      >
        <option value="webp">WebP</option>
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="avif">AVIF</option>
      </select>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Convirtiendo..." : "Convertir Imagen"}
      </button>
    </form>
  );
}
