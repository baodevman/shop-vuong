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
  const product = await getProductByUid(uid);

  if (!product) {
    return { title: 'Product Not Found | VƯƠNG SHOP' };
  }

  return {
    title: `${product.title_en} — VƯƠNG SHOP`,
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
  const [product, allProducts, settings] = await Promise.all([
    getProductByUid(uid),
    getProducts(),
    getShopSettings(),
  ]);

  if (!product) {
    notFound();
  }

  // Pick 3 other random or sequential products
  const relatedProducts = allProducts
    .filter((p) => p.uid !== product.uid)
    .slice(0, 3);

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
