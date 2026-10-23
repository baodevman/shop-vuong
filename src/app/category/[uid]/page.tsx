import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getCategories, getShopSettings } from '@/lib/prismic';
import ShopLayout from '@/components/ShopLayout';
import CatalogClientWrapper from '@/components/CatalogClientWrapper';

interface CategoryPageProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { uid } = await params;
  const [categories, settings] = await Promise.all([
    getCategories(),
    getShopSettings(),
  ]);

  const shopName = settings.shop_name || 'VƯƠNG SHOP';
  const category = categories.find((c) => c.uid === uid || c.id === uid);

  if (!category) {
    return { title: `Category | ${shopName}` };
  }

  return {
    title: `${category.name} (${category.name_en}) — ${shopName}`,
    description: category.description || `Minimalist collection for ${category.name_en}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { uid } = await params;
  const [categories, settings] = await Promise.all([
    getCategories(),
    getShopSettings(),
  ]);

  const categoryExists = categories.some((c) => c.uid === uid || c.id === uid);
  if (!categoryExists && uid !== 'all') {
    notFound();
  }

  const products = await getProducts(uid);

  return (
    <ShopLayout settings={settings}>
      <CatalogClientWrapper
        products={products}
        categories={categories}
        activeCategoryUid={uid}
        settings={settings}
      />
    </ShopLayout>
  );
}
