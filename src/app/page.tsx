import { getProducts, getCategories, getShopSettings } from '@/lib/prismic';
import ShopLayout from '@/components/ShopLayout';
import CatalogClientWrapper from '@/components/CatalogClientWrapper';

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getShopSettings(),
  ]);

  return (
    <ShopLayout settings={settings}>
      <CatalogClientWrapper
        products={products}
        categories={categories}
        activeCategoryUid="all"
        settings={settings}
      />
    </ShopLayout>
  );
}
