'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ProductItem, CategoryItem, ShopSettings, Language } from '@/lib/types';
import ProductCard from './ProductCard';
import ProductDetailView from './ProductDetailView';
import { SearchIcon, CloseIcon } from './FlatIcons';
import styles from './ShopCatalog.module.css';

interface ShopCatalogProps {
  products: ProductItem[];
  categories: CategoryItem[];
  activeCategoryUid?: string;
  language: Language;
  settings?: ShopSettings;
}

function ShopCatalogInner({
  products,
  categories,
  activeCategoryUid = 'all',
  language,
  settings,
}: ShopCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read items per page limit from URL query (?limit=10|20|30), default 20
  const limitParam = Number(searchParams.get('limit'));
  const itemsPerPage = [10, 20, 30].includes(limitParam) ? limitParam : 20;

  // Read page from URL query (?page=1), default 1
  const pageParam = Number(searchParams.get('page'));
  const currentPage = pageParam > 0 ? pageParam : 1;

  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-600' | '600-900' | 'over-900'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('default');

  // Modal State for Product Detail tracking
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [originalCatalogUrl, setOriginalCatalogUrl] = useState<string>('');

  const isEn = language === 'en';

  // Helper to update query parameters in URL (persists on reload)
  const updateQueryParam = useCallback(
    (key: string, value: string) => {
      const current = new URLSearchParams(searchParams.toString());
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleLimitChange = (newLimit: number) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set('limit', newLimit.toString());
    current.set('page', '1'); // reset to page 1
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParam('page', newPage.toString());
    // Scroll back smoothly to catalog start
    if (typeof window !== 'undefined') {
      const element = document.getElementById('catalog-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (activeCategoryUid !== 'all' && item.category !== activeCategoryUid) {
          return false;
        }

        // Price filter: uses price_vnd or price_usd based on active currency
        if (isEn) {
          if (priceFilter === 'under-600' && item.price_usd >= 25) return false;
          if (priceFilter === '600-900' && (item.price_usd < 25 || item.price_usd > 36)) return false;
          if (priceFilter === 'over-900' && item.price_usd <= 36) return false;
        } else {
          if (priceFilter === 'under-600' && item.price_vnd >= 600000) return false;
          if (priceFilter === '600-900' && (item.price_vnd < 600000 || item.price_vnd > 900000)) return false;
          if (priceFilter === 'over-900' && item.price_vnd <= 900000) return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const titleMatch = (isEn ? item.title_en : item.title).toLowerCase().includes(q);
          const descMatch = (isEn ? item.description_en : item.description).toLowerCase().includes(q);
          if (!titleMatch && !descMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price_vnd - b.price_vnd;
        if (sortBy === 'price-desc') return b.price_vnd - a.price_vnd;
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

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, safeCurrentPage, itemsPerPage]);

  // Modal Open Handler with Browser History Push
  const handleOpenProduct = (product: ProductItem) => {
    if (typeof window !== 'undefined') {
      setOriginalCatalogUrl(window.location.pathname + window.location.search);
      // Push state to browser history with the product's dedicated URL
      window.history.pushState(
        { modalProductUid: product.uid, isShopVuongModal: true },
        '',
        `/product/${product.uid}`
      );
    }
    setSelectedProduct(product);
  };

  // Modal Close Handler
  const handleCloseProduct = useCallback(() => {
    setSelectedProduct(null);
    if (typeof window !== 'undefined') {
      if (window.history.state?.isShopVuongModal) {
        window.history.back();
      } else if (originalCatalogUrl) {
        window.history.replaceState(null, '', originalCatalogUrl);
      }
    }
  }, [originalCatalogUrl]);

  // Handle browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.modalProductUid) {
        const found = products.find((p) => p.uid === e.state.modalProductUid);
        if (found) {
          setSelectedProduct(found);
          return;
        }
      }
      setSelectedProduct(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        handleCloseProduct();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, handleCloseProduct]);

  // Prevent background body scroll when modal is active
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const allTabs = [
    { uid: 'all', name: 'Tất cả', name_en: 'All Dresses & Sets', path: '/' },
    { uid: 'dam-ngan', name: 'Đầm ngắn', name_en: 'Short Dresses', path: '/category/dam-ngan' },
    { uid: 'dam-dai', name: 'Đầm dài', name_en: 'Maxi & Midi Dresses', path: '/category/dam-dai' },
    { uid: 'set-bo', name: 'Set bộ', name_en: 'Matching Sets', path: '/category/set-bo' },
  ];

  return (
    <div className={styles.catalogWrapper} id="catalog-content">
      {/* Category Navigation Tabs */}
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

      {/* Filter and Control Bar */}
      <div className={styles.controlBar}>
        {/* Search Input */}
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

        {/* Filter Selectors: Price, Sort, and Items Per Page (10 / 20 / 30) */}
        <div className={styles.filterSelectors}>
          {/* Items Per Page Selector (10 / 20 / 30) */}
          <div className={styles.selectWrap}>
            <label htmlFor="limit-select" className={styles.selectLabel}>
              {isEn ? 'Show' : 'Hiển thị'}:
            </label>
            <div className={styles.limitButtons} id="limit-select">
              {[10, 20, 30].map((num) => {
                const isSelected = itemsPerPage === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleLimitChange(num)}
                    className={`${styles.limitBtn} ${isSelected ? styles.limitBtnActive : ''}`}
                    title={isEn ? `Show ${num} items per page` : `Hiển thị ${num} sản phẩm mỗi trang`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

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
              <option value="600-900">{isEn ? '$25 - $36 (600k - 900k)' : '600.000đ - 900.000đ'}</option>
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

      {/* Active Filter Notice */}
      {(searchQuery || priceFilter !== 'all') && (
        <div className={styles.filterNotice}>
          <span>
            {isEn
              ? `Found ${totalItems} items`
              : `Tìm thấy ${totalItems} sản phẩm`}
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

      {/* Product Grid: 2 columns on mobile, 3 columns on desktop */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className={styles.grid}>
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
                onSelectProduct={handleOpenProduct}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageBtn}
                disabled={safeCurrentPage <= 1}
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                aria-label="Previous page"
              >
                {isEn ? '← Prev' : '← Trước'}
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isActive = p === safeCurrentPage;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      className={`${styles.pageNumberBtn} ${isActive ? styles.pageNumberBtnActive : ''}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className={styles.pageBtn}
                disabled={safeCurrentPage >= totalPages}
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                aria-label="Next page"
              >
                {isEn ? 'Next →' : 'Sau →'}
              </button>
            </div>
          )}
        </>
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

      {/* Product Detail Modal without full page reload, synced to browser history */}
      {selectedProduct && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseProduct();
            }
          }}
        >
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <ProductDetailView
              product={selectedProduct}
              settings={
                settings || {
                  shop_name: 'VƯƠNG SHOP',
                  tagline: 'Thời trang may đo tối giản tông trắng',
                  phone: '0988 123 456',
                  facebook_url: 'https://facebook.com/vuongshop',
                  instagram_url: 'https://instagram.com/vuongshop',
                  shopee_url: 'https://shopee.vn/vuongshop',
                  address: '128 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
                  address_en: '128 Le Loi Street, Ben Thanh Ward, District 1, Ho Chi Minh City',
                }
              }
              relatedProducts={products
                .filter((p) => p.id !== selectedProduct.id)
                .slice(0, 4)}
              isModal={true}
              onClose={handleCloseProduct}
              onSelectRelatedProduct={(related) => {
                handleOpenProduct(related);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopCatalog(props: ShopCatalogProps) {
  return (
    <Suspense fallback={<div className={styles.catalogWrapper}>Loading...</div>}>
      <ShopCatalogInner {...props} />
    </Suspense>
  );
}
