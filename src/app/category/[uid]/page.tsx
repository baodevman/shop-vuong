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
  const categories = await getCategories();
  const category = categories.find((c) => c.uid === uid || c.id === uid);

  if (!category) {
    return { title: 'Category | VƯƠNG SHOP' };
  }

  return {
    title: `${category.name_en} (${category.name}) — VƯƠNG SHOP`,
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
      />
    </ShopLayout>
  );
}
