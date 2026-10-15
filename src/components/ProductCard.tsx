'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductItem, Language } from '@/lib/types';
import { ShareIcon, EyeIcon } from './FlatIcons';
import ShareModal from './ShareModal';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: ProductItem;
  language: Language;
}

export default function ProductCard({ product, language }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isEn = language === 'en';
  const title = isEn ? product.title_en : product.title;

  const priceText = isEn
    ? `$${(product.price / 25000).toFixed(0)} USD`
    : `${product.price.toLocaleString('vi-VN')}đ`;

  const originalPriceText = product.original_price
    ? isEn
      ? `$${(product.original_price / 25000).toFixed(0)} USD`
      : `${product.original_price.toLocaleString('vi-VN')}đ`
    : null;

  const displayImage = isHovered && product.gallery && product.gallery.length > 1
    ? product.gallery[1]
    : product.featured_image;

  const categoryName = {
    'dam-ngan': isEn ? 'Short Dress' : 'Đầm ngắn',
    'dam-dai': isEn ? 'Maxi Dress' : 'Đầm dài',
    'set-bo': isEn ? 'Matching Set' : 'Set bộ',
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
      <div
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={`/product/${product.uid}`}
          className={styles.imageLink}
          aria-label={title}
        >
          <div className={styles.imageContainer}>
            <Image
              src={displayImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.image}
            />

            {badgeText && (
              <span className={styles.badge}>{badgeText}</span>
            )}

            <div className={styles.cardOverlay}>
              <span className={styles.overlayViewBtn}>
                <EyeIcon size={14} />
                <span>{isEn ? 'View Detail' : 'Xem chi tiết'}</span>
              </span>
            </div>
          </div>
        </Link>

        <div className={styles.details}>
          <div className={styles.topRow}>
            <Link
              href={`/category/${product.category}`}
              className={styles.categoryName}
            >
              {categoryName.toUpperCase()}
            </Link>

            <button
              type="button"
              className={styles.shareBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsShareOpen(true);
              }}
              title={isEn ? 'Share product' : 'Chia sẻ sản phẩm'}
              aria-label="Share"
            >
              <ShareIcon size={15} />
            </button>
          </div>

          <h3 className={styles.title}>
            <Link href={`/product/${product.uid}`} className={styles.titleLink}>
              {title}
            </Link>
          </h3>

          <div className={styles.priceRow}>
            <span className={styles.price}>{priceText}</span>
            {originalPriceText && (
              <span className={styles.originalPrice}>{originalPriceText}</span>
            )}
          </div>
        </div>
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
