import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'VƯƠNG SHOP — Minimalist Clothing Atelier | Thời Trang May Đo Tối Giản',
  description: 'Cửa hàng đầm và set bộ may đo tối giản tông trắng thanh lịch. Minimalist white-toned dresses and matching sets crafted from natural fibers.',
  openGraph: {
    title: 'VƯƠNG SHOP — Minimalist Clothing Atelier',
    description: 'Minimalist white-toned dresses and matching sets crafted from natural fibers.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
