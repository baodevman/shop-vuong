'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductItem, CategoryItem, Language } from '@/lib/types';
import ProductCard from './ProductCard';
import { SearchIcon, CloseIcon } from './FlatIcons';
import styles from './ShopCatalog.module.css';

interface ShopCatalogProps {
  products: ProductItem[];
  categories: CategoryItem[];
  activeCategoryUid?: string;
  language: Language;
}

export default function ShopCatalog({
  products,
  categories,
  activeCategoryUid = 'all',
  language,
}: ShopCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-600' | '600-900' | 'over-900'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('default');

  const isEn = language === 'en';

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter (if on general catalog and user picks tab or passed via activeCategoryUid)
      if (activeCategoryUid !== 'all' && item.category !== activeCategoryUid) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under-600' && item.price >= 600000) return false;
      if (priceFilter === '600-900' && (item.price < 600000 || item.price > 900000)) return false;
      if (priceFilter === 'over-900' && item.price <= 900000) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (isEn ? item.title_en : item.title).toLowerCase().includes(q);
        const descMatch = (isEn ? item.description_en : item.description).toLowerCase().includes(q);
        if (!titleMatch && !descMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') {
        const titleA = isEn ? a.title_en : a.title;
        const titleB = isEn ? b.title_en : b.title;
        return titleA.localeCompare(titleB);
      }
      if (sortBy === 'name-desc') {
        const titleA = isEn ? a.title_en : a.title;
        const titleB = isEn ? b.title_en : b.title;
        return titleB.localeCompare(titleA);
      }
      return 0;
    });
  }, [products, activeCategoryUid, priceFilter, searchQuery, sortBy, isEn]);

  const allTabs = [
    { uid: 'all', name: 'Tất cả', name_en: 'All Dresses & Sets', path: '/' },
    { uid: 'dam-ngan', name: 'Đầm ngắn', name_en: 'Short Dresses', path: '/category/dam-ngan' },
    { uid: 'dam-dai', name: 'Đầm dài', name_en: 'Maxi & Midi Dresses', path: '/category/dam-dai' },
    { uid: 'set-bo', name: 'Set bộ', name_en: 'Matching Sets', path: '/category/set-bo' },
  ];

  return (
    <div className={styles.catalogWrapper}>
      {/* 3 Main Category Tabs with Dedicated URLs */}
      <div className={styles.categoryNavigation}>
        <div className={styles.categoryTabs}>
          {allTabs.map((tab) => {
            const isActive = activeCategoryUid === tab.uid;
            return (
              <Link
                key={tab.uid}
                href={tab.path}
                className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
              >
                {isEn ? tab.name_en : tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar: Price filter, Sort by Price & Name, Search */}
      <div className={styles.controlBar}>
        {/* Search input */}
        <div className={styles.searchBox}>
          <SearchIcon size={15} color="#888888" />
          <input
            type="text"
            placeholder={isEn ? 'Search dresses, sets...' : 'Tìm kiếm đầm, set bộ...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <CloseIcon size={12} />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className={styles.filterSelectors}>
          {/* Price Filter */}
          <div className={styles.selectWrap}>
            <label htmlFor="price-filter" className={styles.selectLabel}>
              {isEn ? 'Price' : 'Lọc giá'}:
            </label>
            <select
              id="price-filter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className={styles.selectInput}
            >
              <option value="all">{isEn ? 'All Prices' : 'Mọi mức giá'}</option>
              <option value="under-600">{isEn ? 'Under $25 (< 600.000đ)' : 'Dưới 600.000đ'}</option>
              <option value="600-900">{isEn ? '$25 - $36 (600.000đ - 900.000đ)' : '600.000đ - 900.000đ'}</option>
              <option value="over-900">{isEn ? 'Over $36 (> 900.000đ)' : 'Trên 900.000đ'}</option>
            </select>
          </div>

          {/* Sort Selector: Price & Name */}
          <div className={styles.selectWrap}>
            <label htmlFor="sort-by" className={styles.selectLabel}>
              {isEn ? 'Sort' : 'Sắp xếp'}:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={styles.selectInput}
            >
              <option value="default">{isEn ? 'Featured' : 'Mặc định'}</option>
              <option value="price-asc">{isEn ? 'Price: Low to High' : 'Giá: Thấp đến cao'}</option>
              <option value="price-desc">{isEn ? 'Price: High to Low' : 'Giá: Cao đến thấp'}</option>
              <option value="name-asc">{isEn ? 'Name: A to Z' : 'Tên: A đến Z'}</option>
              <option value="name-desc">{isEn ? 'Name: Z to A' : 'Tên: Z đến A'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Summary if applied */}
      {(searchQuery || priceFilter !== 'all') && (
        <div className={styles.filterNotice}>
          <span>
            {isEn
              ? `Found ${filteredProducts.length} items`
              : `Tìm thấy ${filteredProducts.length} sản phẩm`}
          </span>
          <button
            type="button"
            className={styles.resetFilterBtn}
            onClick={() => {
              setSearchQuery('');
              setPriceFilter('all');
            }}
          >
            {isEn ? 'Reset filters' : 'Xoá bộ lọc'}
          </button>
        </div>
      )}

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>
            {isEn
              ? 'No products match your selected filters.'
              : 'Không có sản phẩm nào phù hợp với bộ lọc.'}
          </p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setSearchQuery('');
              setPriceFilter('all');
              setSortBy('default');
            }}
          >
            {isEn ? 'Reset All Filters' : 'Xem lại tất cả sản phẩm'}
          </button>
        </div>
      )}
    </div>
  );
}
