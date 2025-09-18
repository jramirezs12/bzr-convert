// Servicio de conversión: ahora devuelve { blob, filename, contentType }
// y maneja el caso de 1 archivo (imagen) o múltiples (ZIP).

function humanizeError(res, fallback = "No se pudo completar la conversión.") {
  if (res.status === 413) return "La subida excede el límite del servidor (80 MB).";
  if (res.status === 405) return "Método no permitido en el endpoint.";
  return fallback;
}

function getFilenameFromDisposition(disposition = "") {
  // Content-Disposition: attachment; filename="convertidos_webp.zip"
  const m = /filename\*?=(?:UTF-8''|")?([^";]+)?/i.exec(disposition);
  if (!m) return "";
  try {
    // decode RFC5987 if needed
    return decodeURIComponent(m[1]);
  } catch {
    return m[1] || "";
  }
}

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

  const blob = await res.blob();
  const disposition = res.headers.get("content-disposition") || "";
  const contentType = res.headers.get("content-type") || "application/octet-stream";
  let filename = getFilenameFromDisposition(disposition);

  // Fallbacks
  const isZip = contentType.includes("zip");
  if (!filename) {
    filename = isZip ? `convertidos_${format}.zip` : `convertido.${format}`;
  }

  return { blob, filename, contentType };
}