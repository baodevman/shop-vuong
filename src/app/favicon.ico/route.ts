import { NextRequest, NextResponse } from 'next/server';
import { getShopSettings } from '@/lib/prismic';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const settings = await getShopSettings();
    if (settings?.favicon_url) {
      // Fetch the actual image from Prismic and serve with correct content-type
      const upstreamRes = await fetch(settings.favicon_url, {
        next: { revalidate: 60 },
      });

      if (upstreamRes.ok) {
        const contentType = upstreamRes.headers.get('content-type') || 'image/png';
        const arrayBuffer = await upstreamRes.arrayBuffer();

        return new NextResponse(arrayBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        });
      }

      // If direct fetch failed, redirect to the Prismic CDN URL directly
      return NextResponse.redirect(settings.favicon_url, 307);
    }
  } catch (error) {
    console.error('Error serving dynamic favicon.ico:', error);
  }

  return new NextResponse(null, { status: 204 });
}
