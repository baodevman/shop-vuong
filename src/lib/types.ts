export type Language = 'vi' | 'en';

export interface ProductItem {
  id: string;
  uid: string;
  title: string;
  title_en: string;
  subtitle?: string;
  category: 'dam-ngan' | 'dam-dai' | 'set-bo' | string;
  price: number;
  original_price?: number;
  badge?: string;
  badge_en?: string;
  in_stock: boolean;
  featured_image: string;
  gallery: string[];
  description: string;
  description_en: string;
}

export interface CategoryItem {
  id: string;
  uid: string;
  name: string;
  name_en: string;
  description?: string;
  image?: string;
}

export interface ShopSettings {
  shop_name: string;
  tagline: string;
  phone: string;
  facebook_url: string;
  instagram_url: string;
  shopee_url: string;
  address: string;
  address_en: string;
}
