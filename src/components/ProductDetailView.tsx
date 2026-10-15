'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductItem, ShopSettings } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { ShareIcon, ShopeeIcon, CloseIcon } from './FlatIcons';
import ProductCard from './ProductCard';
import ShareModal from './ShareModal';
import styles from './ProductDetailView.module.css';

interface ProductDetailViewProps {
  product: ProductItem;
  settings: ShopSettings;
  relatedProducts?: ProductItem[];
  isModal?: boolean;
  onClose?: () => void;
  onSelectRelatedProduct?: (product: ProductItem) => void;
}

export default function ProductDetailView({
  product,
  settings,
  relatedProducts = [],
  isModal = false,
  onClose,
  onSelectRelatedProduct,
}: ProductDetailViewProps) {
  const { language } = useLanguage();
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isEn = language === 'en';
  const title = isEn ? product.title_en : product.title;
  const description = isEn ? product.description_en : product.description;

  const priceText = isEn
    ? `$${product.price_usd} USD`
    : `${product.price_vnd.toLocaleString('vi-VN')}đ`;

  const originalPriceText = isEn
    ? product.original_price_usd
      ? `$${product.original_price_usd} USD`
      : null
    : product.original_price_vnd
      ? `${product.original_price_vnd.toLocaleString('vi-VN')}đ`
      : null;

  const gallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.featured_image];

  const currentImage = gallery[activeImgIdx] || product.featured_image;

  const categoryName = {
    'dam-ngan': isEn ? 'Short Dresses' : 'Đầm ngắn',
    'dam-dai': isEn ? 'Maxi Dresses' : 'Đầm dài',
    'set-bo': isEn ? 'Matching Sets' : 'Set bộ',
  }[product.category] || product.category;

  // Single language badge formatting
  const getBadgeLabel = () => {
    if (!product.badge) return null;
    const b = product.badge.toLowerCase();
    if (b.includes('mới') || b.includes('new')) {
      return isEn ? 'NEW' : 'MỚI';
    }
    if (b.includes('bán chạy') || b.includes('best seller')) {
      return isEn ? 'BEST SELLER' : 'BÁN CHẠY';
    }
    if (b.includes('thủ công') || b.includes('artisan')) {
      return isEn ? 'ARTISAN' : 'THỦ CÔNG';
    }
    if (b.includes('giới hạn') || b.includes('limited')) {
      return isEn ? 'LIMITED' : 'GIỚI HẠN';
    }
    return product.badge;
  };

  const badgeText = getBadgeLabel();

  return (
    <>
      <div className={`${styles.container} ${isModal ? styles.modalContainer : ''}`}>
        {/* Modal Close Button */}
        {isModal && onClose && (
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon size={18} />
          </button>
        )}

        {/* Breadcrumb navigation - pure single language */}
        {!isModal ? (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.crumbLink}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span className={styles.crumbSep}>/</span>
            <Link href={`/category/${product.category}`} className={styles.crumbLink}>
              {categoryName}
            </Link>
            <span className={styles.crumbSep}>/</span>
            <span className={styles.crumbCurrent}>{title}</span>
          </nav>
        ) : (
          <div className={styles.modalCategoryBadge}>
            <span>{categoryName.toUpperCase()}</span>
          </div>
        )}

        <div className={styles.productLayout}>
          {/* Gallery Column: 3:4 aspect ratio */}
          <div className={styles.galleryColumn}>
            <div className={styles.mainImageBox}>
              <Image
                src={currentImage}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mainImage}
              />
              {badgeText && (
                <span className={styles.badge}>{badgeText}</span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className={styles.thumbnails}>
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.thumbBtn} ${activeImgIdx === idx ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImgIdx(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${title} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className={styles.thumbImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column: Title, Price, Description, Actions */}
          <div className={styles.infoColumn}>
            <div className={styles.categoryBadge}>
              <Link href={`/category/${product.category}`}>
                {categoryName.toUpperCase()}
              </Link>
            </div>

            <h1 className={styles.title}>{title}</h1>

            <div className={styles.priceRow}>
              <span className={styles.price}>{priceText}</span>
              {originalPriceText && (
                <span className={styles.originalPrice}>{originalPriceText}</span>
              )}
              {product.in_stock ? (
                <span className={styles.inStock}>
                  {isEn ? 'In Stock' : 'Còn hàng'}
                </span>
              ) : (
                <span className={styles.outStock}>
                  {isEn ? 'Pre-order' : 'Hàng đặt may'}
                </span>
              )}
            </div>

            {/* Description only */}
            <div className={styles.descSection}>
              <h2 className={styles.sectionLabel}>
                {isEn ? 'Garment Description' : 'Mô tả sản phẩm'}
              </h2>
              <div className={styles.descText}>
                {description}
              </div>
            </div>

            {/* Actions: Shopee & Share only (NO ZALO) */}
            <div className={styles.actionsWrap}>
              {settings.shopee_url && (
                <a
                  href={settings.shopee_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shopeeBtn}
                >
                  <ShopeeIcon size={18} />
                  <span>{isEn ? 'Order on Shopee' : 'Mua trên Shopee'}</span>
                </a>
              )}

              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => setIsShareOpen(true)}
                aria-label={isEn ? 'Share garment' : 'Chia sẻ sản phẩm'}
              >
                <ShareIcon size={16} />
                <span>{isEn ? 'Share' : 'Chia sẻ'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Other Products Section: 3 items */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <span className={styles.relatedSub}>
                {isEn ? 'RECOMMENDED' : 'GỢI Ý THỜI TRANG'}
              </span>
              <h3 className={styles.relatedTitle}>
                {isEn ? 'Other Garments' : 'Sản phẩm khác'}
              </h3>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProducts.slice(0, 4).map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  language={language}
                  onSelectProduct={onSelectRelatedProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <ShareModal
        product={product}
        language={language}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </>
  );
}
