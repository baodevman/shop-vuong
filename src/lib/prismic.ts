import * as prismic from '@prismicio/client';
import { ProductItem, CategoryItem, ShopSettings } from './types';
import { mockProducts, mockCategories, mockShopSettings } from './mock-data';
import { translateProductItem, translateToEnglish } from './translator';

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

async function mapProductDoc(doc: any): Promise<ProductItem> {
  const d = doc.data;
  const titleVi = prismic.asText(d.title) || d.title || 'Sản phẩm';
  const descVi = prismic.asText(d.description) || d.description || '';
  const badgeVi = d.badge || undefined;

  // Auto-translate from Vietnamese to English
  const translated = await translateProductItem({
    title: titleVi,
    description: descVi,
    badge: badgeVi,
  });

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
    title_en: translated.title_en || titleVi,
    category: (d.category as any) || 'dam-ngan',
    price_vnd: Number(d.price_vnd) || Number(d.price) || 0,
    price_usd: Number(d.price_usd) || (d.price_vnd ? Math.round(Number(d.price_vnd) / 25000) : 0),
    original_price_vnd: d.original_price_vnd ? Number(d.original_price_vnd) : (d.original_price ? Number(d.original_price) : undefined),
    original_price_usd: d.original_price_usd ? Number(d.original_price_usd) : (d.original_price ? Math.round(Number(d.original_price) / 25000) : undefined),
    badge: badgeVi,
    badge_en: translated.badge_en || badgeVi,
    in_stock: d.in_stock !== false,
    featured_image: mainImageUrl,
    gallery: galleryUrls.length > 0 ? galleryUrls : [mainImageUrl],
    description: descVi,
    description_en: translated.description_en || descVi,
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
      return await Promise.all(response.map(mapProductDoc));
    }
  } catch {
    // Graceful fallback to mock data
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
    if (doc) return await mapProductDoc(doc);
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
      return await Promise.all(
        response.map(async (doc: any) => {
          const nameVi = doc.data.name || 'Danh mục';
          const nameEn = await translateToEnglish(nameVi);
          return {
            id: doc.id,
            uid: doc.uid || doc.id,
            name: nameVi,
            name_en: nameEn,
            description: doc.data.description || '',
          };
        })
      );
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
      const addrVi = d.address || mockShopSettings.address;
      const addrEn = d.address_en || (await translateToEnglish(addrVi));
      return {
        shop_name: d.shop_name || mockShopSettings.shop_name,
        tagline: d.tagline || mockShopSettings.tagline,
        phone: d.phone_number || mockShopSettings.phone,
        facebook_url: d.facebook_url || mockShopSettings.facebook_url,
        instagram_url: d.instagram_url || mockShopSettings.instagram_url,
        shopee_url: d.shopee_url || mockShopSettings.shopee_url,
        address: addrVi,
        address_en: addrEn,
      };
    }
  } catch {
    // Fallback
  }
  return mockShopSettings;
}
