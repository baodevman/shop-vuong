'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ProductItem, CategoryItem, ShopSettings, Language } from '@/lib/types';
import { MenuIcon, CloseIcon, CheckIcon } from './FlatIcons';
import ProductCard from './ProductCard';
import ProductDetailView from './ProductDetailView';
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

  // Always 20 items per page as requested
  const itemsPerPage = 20;

  // Read page from URL query (?page=1), default 1
  const pageParam = Number(searchParams.get('page'));
  const currentPage = pageParam > 0 ? pageParam : 1;

  // Sort by: newest (default), price-asc, price-desc
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Modal State for Product Detail tracking
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number | undefined>(undefined);
  const [originalCatalogUrl, setOriginalCatalogUrl] = useState<string>('');

  const isEn = language === 'en';

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set('page', newPage.toString());
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });

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
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price_vnd - b.price_vnd;
        if (sortBy === 'price-desc') return b.price_vnd - a.price_vnd;
        return 0; // Default: Latest/newest
      });
  }, [products, activeCategoryUid, sortBy]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, safeCurrentPage, itemsPerPage]);

  // Modal Open Handler with Browser History Push
  const handleOpenProduct = (product: ProductItem, colorIndex?: number) => {
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
    setSelectedColorIdx(colorIndex);
  };

  // Modal Close Handler
  const handleCloseProduct = useCallback(() => {
    setSelectedProduct(null);
    setSelectedColorIdx(undefined);
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

  // Category Hamburger Menu State & Ref
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    if (isCategoryMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoryMenuOpen]);

  // Close dropdown on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCategoryMenuOpen) {
        setIsCategoryMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isCategoryMenuOpen]);

  const allTabs = [
    { uid: 'all', name: 'Tất cả sản phẩm', name_en: 'All Dresses & Sets', path: '/' },
    { uid: 'dam-ngan', name: 'Đầm ngắn', name_en: 'Short Dresses', path: '/category/dam-ngan' },
    { uid: 'dam-dai', name: 'Đầm dài', name_en: 'Maxi & Midi Dresses', path: '/category/dam-dai' },
    { uid: 'set-bo', name: 'Set bộ', name_en: 'Matching Sets', path: '/category/set-bo' },
  ];

  const currentTab = allTabs.find((t) => t.uid === activeCategoryUid) || allTabs[0];
  const activeLabel = isEn ? currentTab.name_en : currentTab.name;

  return (
    <div className={styles.catalogWrapper} id="catalog-content">
      {/* Category Hamburger Menu inline with Sort Box on the far right */}
      <div className={styles.categoryNavigation}>
        <div className={styles.hamburgerMenuWrapper} ref={categoryMenuRef}>
          <button
            type="button"
            className={`${styles.hamburgerBtn} ${isCategoryMenuOpen ? styles.hamburgerBtnActive : ''}`}
            onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
            aria-expanded={isCategoryMenuOpen}
            aria-label={isEn ? 'Categories Menu' : 'Menu danh mục sản phẩm'}
            title={isEn ? 'Categories' : 'Danh mục sản phẩm'}
          >
            {isCategoryMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>

          {/* Dropdown Menu */}
          {isCategoryMenuOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                {isEn ? 'Collections' : 'Danh mục sản phẩm'}
              </div>
              <div className={styles.dropdownList}>
                {allTabs.map((tab) => {
                  const isActive = activeCategoryUid === tab.uid;
                  return (
                    <Link
                      key={tab.uid}
                      href={tab.path}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className={`${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ''}`}
                    >
                      <span className={styles.itemDot} />
                      <span className={styles.itemName}>{isEn ? tab.name_en : tab.name}</span>
                      {isActive && <CheckIcon size={14} className={styles.checkIcon} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sort Selector: Aligned with menu tabs on the far right */}
        <div className={styles.sortContainer}>
          <label htmlFor="sort-by" className={styles.sortLabel}>
            {isEn ? 'Sort:' : 'Sắp xếp:'}
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={styles.sortSelect}
          >
            <option value="default">{isEn ? 'Newest' : 'Mới nhất'}</option>
            <option value="price-asc">{isEn ? 'Price: Low to High' : 'Giá: Thấp đến cao'}</option>
            <option value="price-desc">{isEn ? 'Price: High to Low' : 'Giá: Cao đến thấp'}</option>
          </select>
        </div>
      </div>

      {/* Product Grid: Tighter gap, bigger cards */}
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

          {/* Pagination Controls (when more than 20 products) */}
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
              ? 'No products available in this category yet.'
              : 'Chưa có sản phẩm nào trong danh mục này.'}
          </p>
          <Link href="/" className={styles.resetBtn}>
            {isEn ? 'View All Dresses & Sets' : 'Xem tất cả sản phẩm'}
          </Link>
        </div>
      )}

      {/* Product Detail Modal */}
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
                .slice(0, 10)}
              isModal={true}
              initialColorIndex={selectedColorIdx}
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
