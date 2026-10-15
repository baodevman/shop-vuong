'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductItem, ShopSettings } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  ShareIcon,
  ZaloIcon,
  ShopeeIcon,
  TruckIcon,
  ShieldCheckIcon,
  RefreshIcon,
} from './FlatIcons';
import ShareModal from './ShareModal';
import styles from './ProductDetailView.module.css';

interface ProductDetailViewProps {
  product: ProductItem;
  settings: ShopSettings;
}

export default function ProductDetailView({
  product,
  settings,
}: ProductDetailViewProps) {
  const { language } = useLanguage();
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isEn = language === 'en';
  const title = isEn ? product.title_en : product.title;
  const description = isEn ? product.description_en : product.description;
  const material = isEn ? product.material_en : product.material;
  const care = isEn ? product.care_instructions_en : product.care_instructions;

  const priceText = isEn
    ? `$${(product.price / 25000).toFixed(0)} USD`
    : `${product.price.toLocaleString('vi-VN')}đ`;

  const originalPriceText = product.original_price
    ? isEn
      ? `$${(product.original_price / 25000).toFixed(0)} USD`
      : `${product.original_price.toLocaleString('vi-VN')}đ`
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

  const zaloMessage = encodeURIComponent(
    `Xin chào Vương Shop, tôi muốn tư vấn mẫu: ${title} (${priceText}) - Link: https://shop-vuong.vercel.app/product/${product.uid}`
  );
  const zaloLink = `https://zalo.me/${settings.zalo_phone || '0988123456'}?text=${zaloMessage}`;

  return (
    <>
      <div className={styles.container}>
        {/* Breadcrumb navigation */}
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
              {product.badge && (
                <span className={styles.badge}>{product.badge}</span>
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

          {/* Details Column */}
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
                  {isEn ? 'Pre-order only' : 'Hàng đặt may'}
                </span>
              )}
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHead}>
                  <span className={styles.sectionLabel}>
                    {isEn ? 'Available Sizes' : 'Kích cỡ (Size)'}
                  </span>
                </div>
                <div className={styles.sizeGroup}>
                  {product.sizes.map((s) => {
                    const isSelected = (selectedSize || product.sizes[0].size_name) === s.size_name;
                    return (
                      <button
                        key={s.size_name}
                        type="button"
                        disabled={!s.available}
                        className={`${styles.sizeBtn} ${isSelected ? styles.sizeActive : ''} ${!s.available ? styles.sizeDisabled : ''}`}
                        onClick={() => setSelectedSize(s.size_name)}
                      >
                        {s.size_name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionLabel}>
                {isEn ? 'Garment Description' : 'Mô tả trang phục'}
              </h2>
              <p className={styles.descText}>{description}</p>
            </div>

            {/* Specifications */}
            <div className={styles.specBox}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{isEn ? 'Material' : 'Chất liệu'}:</span>
                <span className={styles.specVal}>{material}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{isEn ? 'Care Guide' : 'Bảo quản'}:</span>
                <span className={styles.specVal}>{care}</span>
              </div>
            </div>

            {/* CTA Buttons: Zalo, Shopee, Share */}
            <div className={styles.actionsWrap}>
              <a
                href={zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.zaloBtn}
              >
                <ZaloIcon size={18} />
                <span>{isEn ? 'Consult & Order via Zalo' : 'Tư vấn & Mua qua Zalo'}</span>
              </a>

              {settings.shopee_url && (
                <a
                  href={settings.shopee_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shopeeBtn}
                >
                  <ShopeeIcon size={18} />
                  <span>{isEn ? 'View on Shopee' : 'Xem trên Shopee'}</span>
                </a>
              )}

              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => setIsShareOpen(true)}
              >
                <ShareIcon size={16} />
                <span>{isEn ? 'Share' : 'Chia sẻ'}</span>
              </button>
            </div>

            {/* Benefits */}
            <div className={styles.benefitsRow}>
              <div className={styles.benefitItem}>
                <TruckIcon size={15} />
                <span>{isEn ? 'Nationwide Delivery' : 'Giao hàng toàn quốc'}</span>
              </div>
              <div className={styles.benefitItem}>
                <ShieldCheckIcon size={15} />
                <span>{isEn ? 'Artisan Tailoring' : 'Đường may tỉ mỉ'}</span>
              </div>
              <div className={styles.benefitItem}>
                <RefreshIcon size={15} />
                <span>{isEn ? 'Exchange in 7 Days' : 'Hỗ trợ đổi size'}</span>
              </div>
            </div>
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
