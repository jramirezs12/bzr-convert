// Servicio de conversión: centraliza la llamada al endpoint y manejo de errores

function humanizeError(res, fallback = "No se pudo completar la conversión.") {
  if (res.status === 413) return "La subida excede el límite del servidor (80 MB).";
  return fallback;
}

/**
 * Sube archivos al endpoint y devuelve un Blob (ZIP) si todo va bien.
 * Lanza errores con mensajes humanizados en caso de fallo.
 */
export async function convertBatch(files, format) {
  const formData = new FormData();
  formData.append("format", format);
  files.forEach((f) => formData.append("files", f));

  const res = await fetch("/api/convert-batch", { method: "POST", body: formData });

  if (!res.ok) {
    let msg = humanizeError(res);
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }

  return await res.blob();
}