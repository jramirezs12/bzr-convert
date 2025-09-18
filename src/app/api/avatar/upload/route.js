import { NextResponse } from 'next/server';
import { handleUpload } from '@vercel/blob/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json();
  
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('blob upload completed', blob, tokenPayload);
        try {
          // Example: update your DB with blob.url if needed
          // In a real app, you might save the blob URL to a database here
          console.log('Post-upload processing for blob:', blob.url);
        } catch (err) {
          console.error('Post-upload hook failed', err);
          throw new Error('Could not run post-upload actions');
        }
      },
    });
    
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}