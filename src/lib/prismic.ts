import * as prismic from '@prismicio/client';
import { ProductItem, CategoryItem, ShopSettings } from './types';
import { mockProducts, mockCategories, mockShopSettings } from './mock-data';

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT ||
  process.env.PRISMIC_REPOSITORY_NAME ||
  'hub-cms';

export function createClient(config: prismic.ClientConfig = {}) {
  return prismic.createClient(repositoryName, {
    routes: [
      { type: 'product', path: '/product/:uid' },
      { type: 'category', path: '/category/:uid' },
    ],
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });
}

function mapProductDoc(doc: any): ProductItem {
  const d = doc.data;
  const titleVi = prismic.asText(d.title) || d.title || 'Sản phẩm';
  const titleEn = prismic.asText(d.title_en) || d.title_en || titleVi;
  const descVi = prismic.asText(d.description) || d.description || '';
  const descEn = prismic.asText(d.description_en) || d.description_en || descVi;

  const galleryUrls: string[] = [];
  if (Array.isArray(d.gallery)) {
    for (const item of d.gallery) {
      if (item?.image?.url) galleryUrls.push(item.image.url);
    }
  }

  const mainImageUrl = d.featured_image?.url || mockProducts[0].featured_image;

  return {
    id: doc.id,
    uid: doc.uid || doc.id,
    title: titleVi,
    title_en: titleEn,
    category: (d.category as any) || 'dam-ngan',
    price: Number(d.price) || 0,
    original_price: d.original_price ? Number(d.original_price) : undefined,
    badge: d.badge || undefined,
    badge_en: d.badge_en || undefined,
    in_stock: d.in_stock !== false,
    featured_image: mainImageUrl,
    gallery: galleryUrls.length > 0 ? galleryUrls : [mainImageUrl],
    description: descVi,
    description_en: descEn,
  };
}

export async function getProducts(categoryUid?: string): Promise<ProductItem[]> {
  try {
    const client = createClient();
    const predicates = [];
    if (categoryUid && categoryUid !== 'all') {
      predicates.push(prismic.filter.at('my.product.category', categoryUid));
    }

    const response = await client.getAllByType('product', {
      filters: predicates,
    });

    if (response && response.length > 0) {
      return response.map(mapProductDoc);
    }
  } catch {
    // Graceful fallback
  }

  if (categoryUid && categoryUid !== 'all') {
    return mockProducts.filter((p) => p.category === categoryUid);
  }
  return mockProducts;
}

export async function getProductByUid(uid: string): Promise<ProductItem | null> {
  try {
    const client = createClient();
    const doc = await client.getByUID('product', uid);
    if (doc) return mapProductDoc(doc);
  } catch {
    // Fallback
  }
  const found = mockProducts.find((p) => p.uid === uid || p.id === uid);
  return found || null;
}

export async function getCategories(): Promise<CategoryItem[]> {
  try {
    const client = createClient();
    const response = await client.getAllByType('category');
    if (response && response.length > 0) {
      return response.map((doc: any) => ({
        id: doc.id,
        uid: doc.uid || doc.id,
        name: doc.data.name || 'Danh mục',
        name_en: doc.data.name_en || doc.data.name || 'Category',
        description: doc.data.description || '',
      }));
    }
  } catch {
    // Fallback
  }
  return mockCategories;
}

export async function getShopSettings(): Promise<ShopSettings> {
  try {
    const client = createClient();
    const doc: any = await client.getSingle('shop_settings');
    if (doc?.data) {
      const d = doc.data;
      return {
        shop_name: d.shop_name || mockShopSettings.shop_name,
        tagline: d.tagline || mockShopSettings.tagline,
        phone: d.phone_number || mockShopSettings.phone,
        facebook_url: d.facebook_url || mockShopSettings.facebook_url,
        instagram_url: d.instagram_url || mockShopSettings.instagram_url,
        shopee_url: d.shopee_url || mockShopSettings.shopee_url,
        address: d.address || mockShopSettings.address,
        address_en: d.address_en || mockShopSettings.address_en,
      };
    }
  } catch {
    // Fallback
  }
  return mockShopSettings;
}
