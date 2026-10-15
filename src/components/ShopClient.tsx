'use client';

import React, { useState, useMemo } from 'react';
import { ProductItem, CategoryItem, ShopSettings, Language } from '@/lib/types';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import HeroBanner from '@/slices/HeroBanner';
import FeaturedCollection from '@/slices/FeaturedCollection';
import Lookbook from '@/slices/Lookbook';
import BrandStory from '@/slices/BrandStory';
import { FilterIcon } from './FlatIcons';
import styles from './ShopClient.module.css';

interface ShopClientProps {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
  settings: ShopSettings;
}

export default function ShopClient({
  initialProducts,
  categories,
  settings,
}: ShopClientProps) {
  const [language, setLanguage] = useState<Language>('vi');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

  const isEn = language === 'en';

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = (isEn ? item.title_en : item.title).toLowerCase().includes(query);
        const descMatch = (isEn ? item.description_en : item.description).toLowerCase().includes(query);
        const materialMatch = (isEn ? item.material_en : item.material).toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !materialMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [initialProducts, selectedCategory, searchQuery, sortBy, isEn]);

  const categoryTabs = [
    { id: 'all', name: 'Tất cả', name_en: 'All Works' },
    { id: 'tops', name: 'Áo Sơ Mi & Áo Thun', name_en: 'Shirts & Tops' },
    { id: 'bottoms', name: 'Quần Âu & Chân Váy', name_en: 'Trousers & Skirts' },
    { id: 'dresses', name: 'Váy & Đầm Liền', name_en: 'Dresses & Robes' },
    { id: 'outerwear', name: 'Áo Khoác & Blazer', name_en: 'Blazers' },
    { id: 'accessories', name: 'Phụ Kiện Vải', name_en: 'Accessories' },
  ];

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Navbar with language toggle & flat icons */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        settings={settings}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className={styles.main}>
        {/* Slice 1: Hero Banner */}
        <HeroBanner
          language={language}
          onExploreClick={handleScrollToCatalog}
        />

        {/* Slice 2: Featured Collection */}
        <FeaturedCollection
          language={language}
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            handleScrollToCatalog();
          }}
        />

        {/* Catalog Section */}
        <section id="catalog-section" className={styles.catalogSection}>
          <div className={styles.container}>
            {/* Catalog Section Header */}
            <div className={styles.catalogHeader}>
              <div className={styles.headerTitles}>
                <span className={styles.sectionSubtitle}>
                  {isEn ? 'CURATED ATELIER PIECES' : 'BỘ SƯU TẬP THỜI TRANG'}
                </span>
                <h2 className={styles.sectionTitle}>
                  {isEn ? 'Monochrome Collection' : 'Trang Phục Tông Trắng May Đo'}
                </h2>
              </div>

              {/* Sort selector */}
              <div className={styles.filterControls}>
                <span className={styles.sortLabel}>
                  {isEn ? 'Sort by:' : 'Sắp xếp:'}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className={styles.sortSelect}
                  aria-label={isEn ? 'Sort products' : 'Sắp xếp sản phẩm'}
                >
                  <option value="featured">{isEn ? 'Featured Pieces' : 'Nổi bật nhất'}</option>
                  <option value="price-asc">{isEn ? 'Price: Low to High' : 'Giá tăng dần'}</option>
                  <option value="price-desc">{isEn ? 'Price: High to Low' : 'Giá giảm dần'}</option>
                </select>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className={styles.tabContainer} role="tablist">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                    onClick={() => setSelectedCategory(tab.id)}
                  >
                    {isEn ? tab.name_en : tab.name}
                  </button>
                );
              })}
            </div>

            {/* Search result indicator */}
            {searchQuery && (
              <div className={styles.searchStatus}>
                <span>
                  {isEn
                    ? `Searching for "${searchQuery}" (${filteredProducts.length} items found)`
                    : `Kết quả tìm kiếm cho "${searchQuery}" (${filteredProducts.length} sản phẩm)`}
                </span>
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                >
                  {isEn ? 'Clear search' : 'Xoá tìm kiếm'}
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className={styles.productGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    language={language}
                    onQuickView={(p) => setActiveProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyTitle}>
                  {isEn ? 'No garments match your criteria' : 'Không tìm thấy trang phục phù hợp'}
                </p>
                <p className={styles.emptySub}>
                  {isEn
                    ? 'Please try another search keyword or clear active category filters.'
                    : 'Vui lòng thử từ khoá tìm kiếm khác hoặc chọn xem tất cả danh mục.'}
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                >
                  {isEn ? 'View All Garments' : 'Xem Tất Cả Sản Phẩm'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Slice 3: Lookbook Showcase */}
        <Lookbook language={language} />

        {/* Slice 4: Brand Story & Philosophy */}
        <BrandStory language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} settings={settings} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProduct}
        language={language}
        settings={settings}
        isOpen={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
      />
    </div>
  );
}
