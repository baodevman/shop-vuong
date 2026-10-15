export type Language = 'vi' | 'en';

export interface ProductColor {
  name: string;
  name_en: string;
  hex_code: string;
}

export interface ProductSize {
  size_name: string;
  available: boolean;
}

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
  in_stock: boolean;
  featured_image: string;
  gallery: string[];
  description: string;
  description_en: string;
  material: string;
  material_en: string;
  care_instructions: string;
  care_instructions_en: string;
  sizes: ProductSize[];
  colors?: ProductColor[];
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
  zalo_phone?: string;
  zalo?: string;
  address: string;
  address_en: string;
}
