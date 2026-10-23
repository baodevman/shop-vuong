import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByUid, getProducts, getShopSettings } from '@/lib/prismic';
import ShopLayout from '@/components/ShopLayout';
import ProductDetailView from '@/components/ProductDetailView';

interface ProductPageProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { uid } = await params;
  const [product, settings] = await Promise.all([
    getProductByUid(uid),
    getShopSettings(),
  ]);

  const shopName = settings.shop_name || 'VƯƠNG SHOP';

  if (!product) {
    return { title: `Product Not Found | ${shopName}` };
  }

  const productTitle = product.title || product.title_en;

  return {
    title: `${productTitle} — ${shopName}`,
    description: product.description_en || product.description,
    openGraph: {
      title: `${productTitle} — ${shopName}`,
      description: product.description_en || product.description,
      images: [{ url: product.featured_image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { uid } = await params;
  const [product, allProducts, settings] = await Promise.all([
    getProductByUid(uid),
    getProducts(),
    getShopSettings(),
  ]);

  if (!product) {
    notFound();
  }

  // Pick 10 other products for horizontal scroll showcase
  const relatedProducts = allProducts
    .filter((p) => p.uid !== product.uid)
    .slice(0, 10);

  return (
    <ShopLayout settings={settings}>
      <ProductDetailView
        product={product}
        settings={settings}
        relatedProducts={relatedProducts}
      />
    </ShopLayout>
  );
}
