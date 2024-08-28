// app/api/random-image/route.js
import { NextResponse } from 'next/server';
import { bucket } from '../../../firebaseAdmin';

export async function GET() {
  try {
    const [files] = await bucket.getFiles(); // Obtiene todos los archivos en el bucket
    const file = files[Math.floor(Math.random() * files.length)]; // Selecciona un archivo aleatorio

    if (!file) {
      return NextResponse.json({ error: 'No files found in the bucket' }, { status: 404 });
    }

    const signedUrlConfig = {
      action: 'read',
      expires: '03-17-2025',
    };

    const [url] = await file.getSignedUrl(signedUrlConfig); // Genera una URL firmada para acceder al archivo

    return NextResponse.json({ url }); // Devuelve la URL en un objeto JSON
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

