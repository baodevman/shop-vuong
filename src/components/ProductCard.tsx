'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductItem, Language } from '@/lib/types';
import { EyeIcon, ShareIcon } from './FlatIcons';
import ShareModal from './ShareModal';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: ProductItem;
  language: Language;
  onQuickView: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  language,
  onQuickView,
}: ProductCardProps) {
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

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.imageContainer} onClick={() => onQuickView(product)}>
          <Image
            src={displayImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />

          {product.badge && (
            <span className={styles.badge}>{product.badge}</span>
          )}

          <div className={styles.cardOverlay}>
            <button
              type="button"
              className={styles.overlayBtn}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={isEn ? 'Quick view' : 'Xem chi tiết'}
            >
              <EyeIcon size={14} />
              <span>{isEn ? 'Quick View' : 'Xem nhanh'}</span>
            </button>

            <button
              type="button"
              className={styles.overlayIconBtn}
              onClick={(e) => {
                e.stopPropagation();
                setIsShareOpen(true);
              }}
              title={isEn ? 'Share to Facebook, Zalo, Instagram' : 'Chia sẻ lên Facebook, Zalo, Instagram'}
              aria-label={isEn ? 'Share garment' : 'Chia sẻ'}
            >
              <ShareIcon size={15} />
            </button>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.categoryLine}>
            <span className={styles.categoryName}>
              {product.category.toUpperCase()}
            </span>
            {product.colors && product.colors.length > 0 && (
              <div className={styles.miniColors}>
                {product.colors.map((c, i) => (
                  <span
                    key={i}
                    className={styles.miniColorDot}
                    style={{ backgroundColor: c.hex_code }}
                    title={isEn ? c.name_en : c.name}
                  />
                ))}
              </div>
            )}
          </div>

          <h3
            className={styles.title}
            onClick={() => onQuickView(product)}
            title={title}
          >
            {title}
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
