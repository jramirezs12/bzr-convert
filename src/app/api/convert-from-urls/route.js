import JSZip from "jszip";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILES = 20;
const MAX_FILE_SIZE = 8 * 1024 * 1024;   // 8 MB por archivo
const MAX_TOTAL_SIZE = 80 * 1024 * 1024; // 80 MB por lote

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
    const { urls, format: rawFormat } = await req.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return jsonError(400, "No se recibieron URLs de imágenes.");
    }
    if (urls.length > MAX_FILES) {
      return jsonError(400, `Se permiten hasta ${MAX_FILES} archivos por subida.`);
    }

    let format = String(rawFormat || "pdf").toLowerCase();
    if (format === "jpg") format = "jpeg";
    if (!OUTPUT_MIME[format]) {
      return jsonError(400, "Formato no soportado.");
    }

    // Descargamos todos los blobs desde Vercel Blob
    const incoming = [];
    let totalSize = 0;
    const tooBig = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const res = await fetch(url);
      if (!res.ok) {
        return jsonError(400, `No se pudo descargar: ${url}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const size = buffer.length;
      totalSize += size;
      if (size > MAX_FILE_SIZE) {
        const inferredName = inferNameFromUrl(url) || `archivo_${i + 1}`;
        tooBig.push(`${inferredName} (${formatBytes(size)})`);
      }
      incoming.push({
        name: inferNameFromUrl(url) || `archivo_${i + 1}`,
        buffer,
      });
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

    // Caso PDF: combina todas las imágenes en un único PDF
    if (format === "pdf") {
      const { pdfBytes, filename } = await imagesToSinglePdfFromBuffers(incoming);
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
      const item = incoming[0];
      const output = await convertWithSharp(item.buffer, format);

      const base = item.name.replace(/\.[^.]+$/g, "") || "convertido";
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
    for (let index = 0; index < incoming.length; index++) {
      const item = incoming[index];
      const output = await convertWithSharp(item.buffer, format);

      const base = item.name.replace(/\.[^.]+$/g, "") || `convertido_${index + 1}`;
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
    console.error("convert-from-urls error:", err);
    return jsonError(500, "Error al convertir el lote desde URLs.");
  }
}

async function imagesToSinglePdfFromBuffers(items) {
  const pdfDoc = await PDFDocument.create();
  const first = items[0];
  const firstBase = sanitizeFilename(String(first?.name || "imagen").replace(/\.[^.]+$/g, "")) || "imagen";
  const filename = items.length === 1 ? `${firstBase}.pdf` : "imagenes.pdf";

  for (const it of items) {
    const input = it.buffer;

    // Detecta si es jpg; si no, convierte a PNG para preservar transparencia.
    const meta = await sharp(input).metadata();
    const isJpeg = (meta.format || "").toLowerCase() === "jpeg" || (meta.format || "").toLowerCase() === "jpg";

    const processed = isJpeg
      ? await sharp(input).rotate().jpeg({ quality: 90 }).toBuffer()
      : await sharp(input).rotate().png({ compressionLevel: 6 }).toBuffer();

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
  let pipeline = sharp(inputBuffer, { failOn: "none" }).rotate();
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
  return name.replace(/[\\/:"*?<>|]+/g, "_").replace(/\s+/g, " ").trim();
}
function inferNameFromUrl(u) {
  try {
    const url = new URL(u);
    const last = url.pathname.split("/").pop() || "";
    return decodeURIComponent(last);
  } catch {
    return "";
  }
}