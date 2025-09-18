import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // IMPORTANTE: autentica/autorizá aquí si tu app tiene login.
        return {
          // Tipos de imagen permitidos
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/avif',
            'image/gif',
          ],
          addRandomSuffix: true,
          // Hacemos los blobs públicos para que el backend pueda descargarlos
          // sin firmar peticiones adicionales.
          // Si prefieres privado, ajusta tu backend para usar signed URLs.
          access: 'public',
          tokenPayload: JSON.stringify({
            // opcional: podrías enviar datos de usuario o metadatos
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Llamado por Vercel cuando termina la subida del cliente
        // Consejo: Usa ngrok en local y VERCEL_BLOB_CALLBACK_URL para probar callbacks
        console.log('blob upload completed', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}