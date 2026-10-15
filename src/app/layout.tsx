import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VƯƠNG SHOP — Thời Trang May Đo Tối Giản | Minimalist Clothing Atelier',
  description: 'Cửa hàng quần áo thời trang tối giản may đo, phong cách thanh lịch tông trắng chủ đạo, chất liệu linen và cotton tự nhiên nguyên bản.',
  keywords: ['thời trang tối giản', 'shop quần áo', 'áo sơ mi linen', 'quần âu trắng', 'minimalist fashion', 'vuong shop', 'atelier'],
  openGraph: {
    title: 'VƯƠNG SHOP — Thời Trang May Đo Tối Giản',
    description: 'Bộ sưu tập quần áo tối giản tông trắng thanh lịch từ chất liệu tự nhiên.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
