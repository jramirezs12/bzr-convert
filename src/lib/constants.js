// Constantes de dominio de negocio y marca

export const APP = {
  name: "Image Converter",
  author: "jramirezs12",
  supportEmail: "contacto@tu-dominio.com",
};

export const SEO = {
  title: "BZR Convert",
  description: "Convierte tus imágenes fácil y rápido online",
};

export const FORMATS = [
  { id: "webp", label: "WebP", hint: "Ideal para web" },
  { id: "png", label: "PNG", hint: "Transparencias" },
  { id: "jpeg", label: "JPEG", hint: "Compatibilidad" },
  { id: "avif", label: "AVIF", hint: "Compresión moderna" },
];

export const LIMITS = {
  MAX_FILES: 20,
  MAX_FILE_SIZE: 8 * 1024 * 1024, // 8 MB por archivo
  MAX_TOTAL_SIZE: 80 * 1024 * 1024, // 80 MB por lote
};