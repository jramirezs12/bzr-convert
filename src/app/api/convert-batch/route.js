import JSZip from "jszip";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Límites prudentes (mantener alineados con el front)
const MAX_FILES = 20;
const MAX_FILE_SIZE = 8 * 1024 * 1024;   // 8 MB por archivo
const MAX_TOTAL_SIZE = 80 * 1024 * 1024; // 80 MB por lote

const OUTPUT_MIME = {
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
};

export async function POST(req) {
  try {
    const form = await req.formData();
    let format = String(form.get("format") || "webp").toLowerCase();
    if (format === "jpg") format = "jpeg";

    // Recolectar archivos
    const incoming = [];
    for (const [key, value] of form.entries()) {
      if ((key === "files" || key === "file") && value?.arrayBuffer) {
        incoming.push(value);
      }
    }

    if (incoming.length === 0) {
      return jsonError(400, "No se recibieron imágenes.");
    }

    // Validaciones de límite
    if (incoming.length > MAX_FILES) {
      return jsonError(400, `Se permiten hasta ${MAX_FILES} archivos por subida.`);
    }

    let totalSize = 0;
    const tooBig = [];
    for (const f of incoming) {
      const size = Number(f.size ?? 0);
      totalSize += size;
      if (size > MAX_FILE_SIZE) tooBig.push(`${f.name || "archivo"} (${formatBytes(size)})`);
    }

    if (tooBig.length > 0) {
      return jsonError(
        400,
        `Cada archivo debe pesar como máximo ${formatBytes(MAX_FILE_SIZE)}. Superan el límite: ${tooBig.slice(0, 3).join(", ")}${tooBig.length > 3 ? "…" : ""}`
      );
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return jsonError(
        400,
        `El lote completo supera ${formatBytes(MAX_TOTAL_SIZE)} (actual: ${formatBytes(totalSize)}). Reduce la cantidad o el tamaño.`
      );
    }

    // Conversión
    if (incoming.length === 1) {
      // Devolver un SOLO archivo convertido directamente
      const file = incoming[0];
      const input = Buffer.from(await file.arrayBuffer());
      const output = await convertWithSharp(input, format);

      const original = String(file.name || "convertido");
      const base = original.replace(/\.[^.]+$/g, "") || "convertido";
      const outName = sanitizeFilename(`${base}.${format}`);
      const contentType = OUTPUT_MIME[format] || "application/octet-stream";

      return new Response(output, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${outName}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // 2 o más: devolver ZIP
    const zip = new JSZip();

    let index = 0;
    for (const file of incoming) {
      index += 1;
      const input = Buffer.from(await file.arrayBuffer());
      const output = await convertWithSharp(input, format);

      const original = String(file.name || `convertido_${index}`);
      const base = original.replace(/\.[^.]+$/g, "") || `convertido_${index}`;
      const filename = sanitizeFilename(`${base}.${format}`);

      zip.file(filename, output);
    }

    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="convertidos_${format}.zip"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    // Si Next devuelve 413 por límite de body
    if (String(err?.message || "").includes("Body exceeded")) {
      return jsonError(413, "La subida excede el límite del servidor. Intenta con menos archivos o reduce su tamaño.");
    }
    console.error("convert-batch error:", err);
    return jsonError(500, "Error al convertir el lote.");
  }
}

async function convertWithSharp(inputBuffer, format) {
  let pipeline = sharp(inputBuffer, { failOn: "none" });
  switch (format) {
    case "png":
      pipeline = pipeline.png();
      break;
    case "jpeg":
      pipeline = pipeline.jpeg({ quality: 82 });
      break;
    case "webp":
      pipeline = pipeline.webp({ quality: 82 });
      break;
    case "avif":
      pipeline = pipeline.avif({ quality: 50 });
      break;
    default:
      throw new Error("Formato no soportado.");
  }
  return await pipeline.toBuffer();
}

function jsonError(status, message) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(i ? 2 : 0)} ${units[i]}`;
}

function sanitizeFilename(name) {
  return name
    .replace(/[\\/:"*?<>|]+/g, "_")
    .replace(/\s+/g, " ")
    .trim();
}