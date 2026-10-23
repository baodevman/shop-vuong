export type Language = 'vi' | 'en';

export interface ColorVariation {
  name: string;
  code?: string;
  image?: string;
}

export interface ProductItem {
  id: string;
  uid: string;
  title: string;
  title_en: string;
  subtitle?: string;
  category: 'dam-ngan' | 'dam-dai' | 'set-bo' | string;
  price_vnd: number;
  price_usd: number;
  original_price_vnd?: number;
  original_price_usd?: number;
  badge?: string;
  badge_en?: string;
  colors?: ColorVariation[];
  size_chart_image?: string;
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
  logo_url?: string;
  tagline: string;
  phone: string;
  google_maps_url?: string;
  facebook_url: string;
  instagram_url: string;
  shopee_url: string;
  address: string;
  address_en: string;
  top_banner_url?: string;
  top_banner_link?: string;
  // SEO & Metadata
  site_title?: string;
  meta_description?: string;
  favicon_url?: string;
  og_image_url?: string;
  keywords?: string;
}
