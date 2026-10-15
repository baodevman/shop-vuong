import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByUid, getShopSettings } from '@/lib/prismic';
import ShopLayout from '@/components/ShopLayout';
import ProductDetailView from '@/components/ProductDetailView';

interface ProductPageProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { uid } = await params;
  const product = await getProductByUid(uid);

  if (!product) {
    return { title: 'Product Not Found | VƯƠNG SHOP' };
  }

  return {
    title: `${product.title_en} (${product.title}) — VƯƠNG SHOP`,
    description: product.description_en || product.description,
    openGraph: {
      title: `${product.title_en} — VƯƠNG SHOP`,
      description: product.description_en || product.description,
      images: [{ url: product.featured_image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { uid } = await params;
  const [product, settings] = await Promise.all([
    getProductByUid(uid),
    getShopSettings(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ShopLayout settings={settings}>
      <ProductDetailView product={product} settings={settings} />
    </ShopLayout>
  );
}
