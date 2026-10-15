import * as prismic from '@prismicio/client';
import { ProductItem, CategoryItem, ShopSettings } from './types';
import { mockProducts, mockCategories, mockShopSettings } from './mock-data';

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT ||
  process.env.PRISMIC_REPOSITORY_NAME ||
  'hub-cms';

/**
 * Creates a Prismic client for the project's repository.
 */
export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes: [
      {
        type: 'product',
        path: '/product/:uid',
      },
      {
        type: 'category',
        path: '/category/:uid',
      },
      {
        type: 'homepage',
        path: '/',
      },
    ],
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  return client;
}

/**
 * Fetch all products from Prismic, with graceful fallback to mock data
 */
export async function getProducts(): Promise<ProductItem[]> {
  try {
    const client = createClient();
    const response = await client.getAllByType('product');

    if (!response || response.length === 0) {
      return mockProducts;
    }

    return response.map((doc: any) => {
      const d = doc.data;
      const titleVi = prismic.asText(d.title) || d.title || 'Sản phẩm không tên';
      const titleEn = prismic.asText(d.title_en) || d.title_en || titleVi;
      const descVi = prismic.asText(d.description) || d.description || '';
      const descEn = prismic.asText(d.description_en) || d.description_en || descVi;

      const galleryUrls: string[] = [];
      if (Array.isArray(d.gallery)) {
        for (const item of d.gallery) {
          if (item?.image?.url) galleryUrls.push(item.image.url);
        }
      }

      return {
        id: doc.id,
        uid: doc.uid || doc.id,
        title: titleVi,
        title_en: titleEn,
        category: (d.category as any) || 'tops',
        price: Number(d.price) || 0,
        original_price: d.original_price ? Number(d.original_price) : undefined,
        badge: d.badge || undefined,
        in_stock: d.in_stock !== false,
        featured_image: d.featured_image?.url || mockProducts[0].featured_image,
        gallery: galleryUrls.length > 0 ? galleryUrls : [d.featured_image?.url || mockProducts[0].featured_image],
        description: descVi,
        description_en: descEn,
        material: d.material || 'Linen & Cotton tự nhiên',
        material_en: d.material_en || 'Natural Linen & Organic Cotton',
        care_instructions: d.care_instructions || 'Giặt nhẹ tay, phơi bóng râm',
        care_instructions_en: d.care_instructions_en || 'Hand wash cold, dry in shade',
        sizes: Array.isArray(d.sizes) && d.sizes.length > 0
          ? d.sizes.map((s: any) => ({ size_name: s.size_name || 'Freesize', available: s.available !== false }))
          : [{ size_name: 'Freesize', available: true }],
        colors: Array.isArray(d.colors) && d.colors.length > 0
          ? d.colors.map((c: any) => ({ name: c.name || 'Trắng', name_en: c.name_en || 'White', hex_code: c.hex_code || '#ffffff' }))
          : [{ name: 'Trắng', name_en: 'White', hex_code: '#ffffff' }],
      };
    });
  } catch (error) {
    // If Prismic is not configured yet or repository has no published products yet, return mock data
    return mockProducts;
  }
}

/**
 * Fetch shop settings with fallback
 */
export async function getShopSettings(): Promise<ShopSettings> {
  try {
    const client = createClient();
    const doc: any = await client.getSingle('shop_settings');
    if (doc?.data) {
      const d = doc.data;
      return {
        shop_name: d.shop_name || mockShopSettings.shop_name,
        tagline_vi: d.tagline || mockShopSettings.tagline_vi,
        tagline_en: d.tagline || mockShopSettings.tagline_en,
        phone: d.phone_number || mockShopSettings.phone,
        zalo: d.zalo_phone || mockShopSettings.zalo,
        facebook: d.facebook_page || mockShopSettings.facebook,
        instagram: d.instagram_handle || mockShopSettings.instagram,
        address_vi: d.address || mockShopSettings.address_vi,
        address_en: d.address || mockShopSettings.address_en,
      };
    }
  } catch {
    // Graceful fallback
  }
  return mockShopSettings;
}

/**
 * Fetch categories with fallback
 */
export async function getCategories(): Promise<CategoryItem[]> {
  try {
    const client = createClient();
    const response = await client.getAllByType('category');
    if (response && response.length > 0) {
      return response.map((doc: any) => ({
        id: doc.uid || doc.id,
        name: doc.data.name || 'Danh mục',
        name_en: doc.data.name_en || doc.data.name || 'Category',
        description: doc.data.description || '',
        description_en: doc.data.description || '',
        image: doc.data.image?.url || mockCategories[0].image,
      }));
    }
  } catch {
    // Graceful fallback
  }
  return mockCategories;
}
