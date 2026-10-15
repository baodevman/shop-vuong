import { getProducts, getCategories, getShopSettings } from '@/lib/prismic';
import ShopClient from '@/components/ShopClient';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getShopSettings(),
  ]);

  return (
    <ShopClient
      initialProducts={products}
      categories={categories}
      settings={settings}
    />
  );
}
