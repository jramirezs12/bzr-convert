import JSZip from "jszip";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

// Afinar sharp para serverless
sharp.simd(true);
sharp.concurrency(1);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Aumenta si tu plan de Vercel lo permite (Pro/Enterprise)
export const maxDuration = 60;

const MAX_FILES = 20;
const MAX_FILE_SIZE = 8 * 1024 * 1024;   // 8 MB por archivo
const MAX_TOTAL_SIZE = 80 * 1024 * 1024; // 80 MB por lote
// Nuevo: cap de dimensión para acelerar conversión
const MAX_DIMENSION = 4096; // px

const OUTPUT_MIME = {
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
  pdf: "application/pdf",
};

export async function POST(req) {
  try {
    const form = await req.formData();
    let format = String(form.get("format") || "pdf").toLowerCase();
    if (format === "jpg") format = "jpeg";

    // Recolectar archivos
    const incoming = [];
    for (const [key, value] of form.entries()) {
      if ((key === "files" || key === "file") && value?.arrayBuffer) {
        incoming.push(value);
      }
    }
    if (!incoming.length) return jsonError(400, "No se recibieron imágenes.");
    if (incoming.length > MAX_FILES) return jsonError(400, `Se permiten hasta ${MAX_FILES} archivos por subida.`);

    let totalSize = 0;
    const tooBig = [];
    for (const f of incoming) {
      const size = Number(f.size ?? 0);
      totalSize += size;
      if (size > MAX_FILE_SIZE) tooBig.push(`${f.name || "archivo"} (${formatBytes(size)})`);
    }
    if (tooBig.length) {
      return jsonError(
        400,
        `Cada archivo debe pesar como máximo ${formatBytes(MAX_FILE_SIZE)}. Superan el límite: ${tooBig.slice(0, 3).join(", ")}${tooBig.length > 3 ? "…" : ""}`
      );
    }
    if (totalSize > MAX_TOTAL_SIZE) {
      return jsonError(400, `El lote completo supera ${formatBytes(MAX_TOTAL_SIZE)} (actual: ${formatBytes(totalSize)}). Reduce la cantidad o el tamaño.`);
    }

    // Caso PDF: combina todas las imágenes en un único PDF (1 página por imagen)
    if (format === "pdf") {
      const { pdfBytes, filename } = await imagesToSinglePdf(incoming);
      return new Response(pdfBytes, {
        status: 200,
        headers: {
          "Content-Type": OUTPUT_MIME.pdf,
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // Otros formatos: 1 imagen => archivo directo, 2+ => ZIP
    if (incoming.length === 1) {
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
    if (String(err?.message || "").includes("Body exceeded")) {
      return jsonError(413, "La subida excede el límite del servidor. Intenta con menos archivos o reduce su tamaño.");
    }
    console.error("convert-batch error:", err);
    return jsonError(500, "Error al convertir el lote.");
  }
}

async function imagesToSinglePdf(files) {
  const pdfDoc = await PDFDocument.create();
  const first = files[0];
  const firstBase = sanitizeFilename(String(first?.name || "imagen").replace(/\.[^.]+$/g, "")) || "imagen";
  const filename = files.length === 1 ? `${firstBase}.pdf` : "imagenes.pdf";

  for (const f of files) {
    const input = Buffer.from(await f.arrayBuffer());

    // Preproceso + redimensionado para PDF
    const meta = await sharp(input).metadata();
    const isJpeg = (meta.format || "").toLowerCase() === "jpeg" || (meta.format || "").toLowerCase() === "jpg";

    const processed = isJpeg
      ? await sharp(input).rotate().resize({
          width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true,
        }).jpeg({ quality: 90, chromaSubsampling: "4:2:0" }).toBuffer()
      : await sharp(input).rotate().resize({
          width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true,
        }).png({ compressionLevel: 5, adaptiveFiltering: true }).toBuffer();

    const image = isJpeg
      ? await pdfDoc.embedJpg(processed)
      : await pdfDoc.embedPng(processed);

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return { pdfBytes, filename };
}

async function convertWithSharp(inputBuffer, format) {
  // Redimensiona para acelerar la codificación
  let pipeline = sharp(inputBuffer, { failOn: "none" })
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });

  switch (format) {
    case "png":
      pipeline = pipeline.png({ compressionLevel: 5, adaptiveFiltering: true });
      break;
    case "jpeg":
      pipeline = pipeline.jpeg({ quality: 80, chromaSubsampling: "4:2:0", mozjpeg: false });
      break;
    case "webp":
      // effort (si tu versión de sharp lo soporta) puede ayudar; si no, se ignorará.
      pipeline = pipeline.webp({ quality: 78, smartSubsample: true });
      break;
    case "avif":
      // CLAVE: baja effort y calidad moderada
      pipeline = pipeline.avif({ quality: 45, effort: 2, chromaSubsampling: "4:2:0" });
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
  return name.replace(/[\\/:"*?<>|]+/g, "_").replace(/\s+/g, " ").trim();
}