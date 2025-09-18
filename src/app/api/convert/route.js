import { NextResponse } from "next/server";
import sharp from "sharp";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const format = data.get("format");

    if (!file || !format) {
      return NextResponse.json({ error: "Falta archivo o formato" }, { status: 400 });
    }

    // Guardar archivo temporal
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = path.join(process.cwd(), "temp-" + file.name);
    await writeFile(tempPath, buffer);

    // Convertir imagen
    const outputBuffer = await sharp(tempPath)
      .toFormat(format)
      .toBuffer();

    // Eliminar temporal
    await unlink(tempPath);

    return new Response(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename=convertido.${format}`,
      },
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al convertir imagen" }, { status: 500 });
  }
}
