import type { Metadata } from 'next';
import './globals.css';
import { getShopSettings } from '@/lib/prismic';
import { LanguageProvider } from '@/context/LanguageContext';
import PageTransitionLoading from '@/components/PageTransitionLoading';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getShopSettings();

  const title =
    settings.site_title ||
    `${settings.shop_name} — Minimalist Clothing Atelier | Thời Trang May Đo Tối Giản`;

  const description =
    settings.meta_description ||
    'Cửa hàng đầm và set bộ may đo tối giản tông trắng thanh lịch từ sợi tự nhiên thuần khiết.';

  const faviconUrl = settings.favicon_url || '/favicon.ico';

  const icons = {
    icon: [
      { url: faviconUrl },
      { url: faviconUrl, sizes: '32x32' },
      { url: faviconUrl, sizes: '64x64' },
      { url: faviconUrl, sizes: '180x180' },
    ],
    shortcut: faviconUrl,
    apple: faviconUrl,
  };

  const ogImages = settings.og_image_url
    ? [{ url: settings.og_image_url }]
    : settings.logo_url
      ? [{ url: settings.logo_url }]
      : undefined;

  return {
    title,
    description,
    keywords:
      settings.keywords ||
      'thời trang tối giản, đầm trắng, đầm linen, set bộ, vương shop, minimalist clothing atelier',
    icons,
    openGraph: {
      title,
      description,
      type: 'website',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages ? [ogImages[0].url] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <GoogleAnalytics />
        <LanguageProvider>
          <PageTransitionLoading />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
