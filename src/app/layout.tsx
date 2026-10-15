import type { Metadata } from 'next';
import './globals.css';
import { getShopSettings } from '@/lib/prismic';
import { LanguageProvider } from '@/context/LanguageContext';
import PageTransitionLoading from '@/components/PageTransitionLoading';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getShopSettings();

  const title =
    settings.site_title ||
    `${settings.shop_name} — Minimalist Clothing Atelier | Thời Trang May Đo Tối Giản`;

  const description =
    settings.meta_description ||
    'Cửa hàng đầm và set bộ may đo tối giản tông trắng thanh lịch từ sợi tự nhiên thuần khiết.';

  const icons = settings.favicon_url
    ? [{ rel: 'icon', url: settings.favicon_url }]
    : undefined;

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
        <LanguageProvider>
          <PageTransitionLoading />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
