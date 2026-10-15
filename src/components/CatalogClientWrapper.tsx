'use client';

import React from 'react';
import { ProductItem, CategoryItem, ShopSettings } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import ShopCatalog from './ShopCatalog';

interface CatalogClientWrapperProps {
  products: ProductItem[];
  categories: CategoryItem[];
  activeCategoryUid?: string;
  settings?: ShopSettings;
}

export default function CatalogClientWrapper({
  products,
  categories,
  activeCategoryUid,
  settings,
}: CatalogClientWrapperProps) {
  const { language } = useLanguage();

  return (
    <ShopCatalog
      products={products}
      categories={categories}
      activeCategoryUid={activeCategoryUid}
      language={language}
      settings={settings}
    />
  );
}
