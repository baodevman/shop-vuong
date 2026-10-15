'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductItem, Language, ShopSettings } from '@/lib/types';
import {
  CloseIcon,
  ShareIcon,
  ShieldCheckIcon,
  TruckIcon,
  RefreshIcon,
  ZaloIcon,
} from './FlatIcons';
import ShareModal from './ShareModal';
import styles from './ProductDetailModal.module.css';

interface ProductDetailModalProps {
  product: ProductItem | null;
  language: Language;
  settings: ShopSettings;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  language,
  settings,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isEn = language === 'en';

  if (!isOpen || !product) return null;

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

  const currentGallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.featured_image];

  const activeImage = currentGallery[selectedImageIdx] || product.featured_image;

  // Build Zalo direct consultation URL with product title
  const zaloConsultMessage = encodeURIComponent(
    `Xin chào Vương Shop, tôi muốn được tư vấn mẫu: ${title} (${priceText})`
  );
  const zaloLink = `https://zalo.me/${settings.zalo}?text=${zaloConsultMessage}`;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={isEn ? 'Close' : 'Đóng'}
          >
            <CloseIcon size={20} />
          </button>

          <div className={styles.layout}>
            {/* Gallery Column */}
            <div className={styles.galleryCol}>
              <div className={styles.mainImageBox}>
                <Image
                  src={activeImage}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mainImage}
                />
                {product.badge && (
                  <span className={styles.badge}>{product.badge}</span>
                )}
              </div>

              {currentGallery.length > 1 && (
                <div className={styles.thumbnails}>
                  {currentGallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.thumbBtn} ${selectedImageIdx === idx ? styles.thumbActive : ''}`}
                      onClick={() => setSelectedImageIdx(idx)}
                    >
                      <Image
                        src={img}
                        alt={`${title} view ${idx + 1}`}
                        fill
                        sizes="70px"
                        className={styles.thumbImage}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className={styles.contentCol}>
              <div className={styles.headerInfo}>
                <span className={styles.categoryBadge}>
                  {product.category.toUpperCase()}
                </span>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{priceText}</span>
                  {originalPriceText && (
                    <span className={styles.originalPrice}>{originalPriceText}</span>
                  )}
                  {product.in_stock ? (
                    <span className={styles.stockIn}>
                      {isEn ? 'In Stock' : 'Còn hàng'}
                    </span>
                  ) : (
                    <span className={styles.stockOut}>
                      {isEn ? 'Pre-order only' : 'Hàng đặt may'}
                    </span>
                  )}
                </div>
              </div>

              {/* Color selection */}
              {product.colors && product.colors.length > 0 && (
                <div className={styles.optionSection}>
                  <div className={styles.optionHeader}>
                    <span className={styles.optionLabel}>
                      {isEn ? 'Color Palette' : 'Màu sắc'}
                    </span>
                    <span className={styles.optionValue}>
                      {selectedColor || (isEn ? product.colors[0].name_en : product.colors[0].name)}
                    </span>
                  </div>
                  <div className={styles.colorSwatches}>
                    {product.colors.map((c) => {
                      const colorName = isEn ? c.name_en : c.name;
                      const isCurrent = (selectedColor || (isEn ? product.colors[0].name_en : product.colors[0].name)) === colorName;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          className={`${styles.colorBtn} ${isCurrent ? styles.colorActive : ''}`}
                          onClick={() => setSelectedColor(colorName)}
                          title={colorName}
                        >
                          <span
                            className={styles.colorDot}
                            style={{ backgroundColor: c.hex_code }}
                          />
                          <span className={styles.colorText}>{colorName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className={styles.optionSection}>
                  <div className={styles.optionHeader}>
                    <span className={styles.optionLabel}>
                      {isEn ? 'Available Sizes' : 'Kích cỡ (Size)'}
                    </span>
                  </div>
                  <div className={styles.sizeGroup}>
                    {product.sizes.map((s) => {
                      const isCurrent = (selectedSize || product.sizes[0].size_name) === s.size_name;
                      return (
                        <button
                          key={s.size_name}
                          type="button"
                          disabled={!s.available}
                          className={`${styles.sizeBtn} ${isCurrent ? styles.sizeActive : ''} ${!s.available ? styles.sizeDisabled : ''}`}
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
              <div className={styles.descSection}>
                <h4 className={styles.sectionTitle}>
                  {isEn ? 'Garment Description' : 'Mô tả trang phục'}
                </h4>
                <p className={styles.descText}>{description}</p>
              </div>

              {/* Specifications */}
              <div className={styles.specBox}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>
                    {isEn ? 'Material' : 'Chất liệu'}:
                  </span>
                  <span className={styles.specValue}>{material}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>
                    {isEn ? 'Care Guide' : 'Bảo quản'}:
                  </span>
                  <span className={styles.specValue}>{care}</span>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actionButtons}>
                <a
                  href={zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.orderZaloBtn}
                >
                  <ZaloIcon size={18} />
                  <span>{isEn ? 'Consult & Order via Zalo' : 'Tư vấn & Mua qua Zalo'}</span>
                </a>

                <button
                  type="button"
                  className={styles.shareBtn}
                  onClick={() => setIsShareOpen(true)}
                  aria-label={isEn ? 'Share product' : 'Chia sẻ sản phẩm'}
                >
                  <ShareIcon size={16} />
                  <span>{isEn ? 'Share' : 'Chia sẻ'}</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className={styles.guaranteeRow}>
                <div className={styles.guaranteeItem}>
                  <TruckIcon size={15} />
                  <span>{isEn ? 'Fast nationwide delivery' : 'Giao hàng toàn quốc'}</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <ShieldCheckIcon size={15} />
                  <span>{isEn ? 'Inspected artisan finish' : 'Đường may chỉn chu'}</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <RefreshIcon size={15} />
                  <span>{isEn ? 'Size exchange in 7 days' : 'Đổi size trong 7 ngày'}</span>
                </div>
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
