'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductItem, ShopSettings } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { ShareIcon, ShopeeIcon, CloseIcon } from './FlatIcons';
import { trackProductView, trackContactClick, trackColorSelect } from '@/lib/analytics';
import ProductCard from './ProductCard';
import ShareModal from './ShareModal';
import styles from './ProductDetailView.module.css';

interface ProductDetailViewProps {
  product: ProductItem;
  settings: ShopSettings;
  relatedProducts?: ProductItem[];
  isModal?: boolean;
  initialColorIndex?: number;
  onClose?: () => void;
  onSelectRelatedProduct?: (product: ProductItem) => void;
}

export default function ProductDetailView({
  product,
  settings,
  relatedProducts = [],
  isModal = false,
  initialColorIndex,
  onClose,
  onSelectRelatedProduct,
}: ProductDetailViewProps) {
  const { language } = useLanguage();
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number | null>(
    typeof initialColorIndex === 'number' ? initialColorIndex : null
  );
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isSizeZoomOpen, setIsSizeZoomOpen] = useState(false);

  const isEn = language === 'en';
  const title = isEn ? product.title_en : product.title;
  const description = isEn ? product.description_en : product.description;

  // Client-side translation state
  const [translatedHtml, setTranslatedHtml] = useState<string | null>(
    product.description_en_html || null
  );
  const [isTranslating, setIsTranslating] = useState(false);

  // Client-side translation when user switches to English and no English version exists
  useEffect(() => {
    if (isEn && !translatedHtml && (product.description_html || product.description)) {
      let isCancelled = false;
      setIsTranslating(true);
      fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: product.description_html,
          text: product.description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!isCancelled && data.translatedHtml) {
            setTranslatedHtml(data.translatedHtml);
          }
        })
        .catch((err) => {
          console.error('Translation error:', err);
        })
        .finally(() => {
          if (!isCancelled) {
            setIsTranslating(false);
          }
        });

      return () => {
        isCancelled = true;
      };
    }
  }, [isEn, translatedHtml, product.description_html, product.description]);

  // Language-aware size chart: Show English size chart if available when English is selected, otherwise Vietnamese
  const sizeChartUrl = isEn
    ? (product.size_chart_image_en || product.size_chart_image)
    : (product.size_chart_image || product.size_chart_image_en);

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
    : (product.featured_image ? [product.featured_image] : []);

  const activeColorImage = selectedColorIdx !== null ? product.colors?.[selectedColorIdx]?.image : null;
  const currentImage = activeColorImage || gallery[activeImgIdx] || product.featured_image;

  // Track product view in Google Analytics
  useEffect(() => {
    if (product) {
      trackProductView(product);
    }
  }, [product]);

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

        <div className={styles.productLayout}>
          {/* Gallery Column: Thumbnails on top with horizontal scroll, then Full Image below */}
          <div className={styles.galleryColumn}>
            {gallery.length > 1 && (
              <div className={styles.thumbnails}>
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.thumbBtn} ${activeImgIdx === idx && !activeColorImage ? styles.thumbActive : ''}`}
                    onClick={() => {
                      setActiveImgIdx(idx);
                      setSelectedColorIdx(null);
                    }}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${title} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className={styles.thumbImage}
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}

            <div className={styles.mainImageBox}>
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                  className={styles.mainImage}
                  unoptimized
                />
              ) : (
                <div className={styles.noImagePlaceholder}>VƯƠNG SHOP</div>
              )}
              {badgeText && (
                <span className={styles.badge}>{badgeText}</span>
              )}
            </div>
          </div>

          {/* Details Column: Title, Price, Color Variations below Price, Size Chart, Description, Actions */}
          <div className={styles.infoColumn}>
            {/* Title directly without category on top */}
            <h1 className={styles.title}>{title}</h1>

            {/* Price Row */}
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

            {/* Color Variations below Price - Clean icons and names without redundant label */}
            {product.colors && product.colors.length > 0 && (
              <div className={styles.colorSection}>
                <div className={styles.colorList}>
                  {product.colors.map((c, idx) => {
                    const isSelected = selectedColorIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`${styles.colorItemBtn} ${isSelected ? styles.colorItemBtnActive : ''}`}
                        title={c.name}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedColorIdx(null);
                          } else {
                            setSelectedColorIdx(idx);
                            trackColorSelect(title, c.name);
                            if (c.image) {
                              const foundIdx = gallery.findIndex((g) => g === c.image);
                              if (foundIdx >= 0) setActiveImgIdx(foundIdx);
                            }
                          }
                        }}
                      >
                        <span
                          className={styles.colorBadgeCircle}
                          style={{ backgroundColor: c.code || '#f0f0f0' }}
                        />
                        <span className={styles.colorNameText}>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Chart Section above Description with compact preview & click to zoom */}
            {sizeChartUrl && (
              <div className={styles.sizeSection}>
                <div className={styles.sizeSectionHeader}>
                  <h2 className={styles.sectionLabel}>
                    {isEn ? 'Size Guide' : 'Bảng size'}
                  </h2>
                  <span className={styles.sizeZoomHint} onClick={() => setIsSizeZoomOpen(true)}>
                    {isEn ? 'Click to zoom 🔍' : 'Chạm để phóng to 🔍'}
                  </span>
                </div>
                <div
                  className={styles.sizeChartBox}
                  onClick={() => setIsSizeZoomOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setIsSizeZoomOpen(true);
                  }}
                  title={isEn ? 'Click to enlarge size chart' : 'Click để phóng to bảng size'}
                >
                  <Image
                    src={sizeChartUrl}
                    alt={isEn ? `${title} Size Guide` : `Bảng size ${title}`}
                    width={600}
                    height={400}
                    className={styles.sizeChartImg}
                    unoptimized
                  />
                  <div className={styles.zoomOverlayBadge}>
                    <span>{isEn ? 'Zoom 🔍' : 'Phóng to 🔍'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Description with live translation & rich paragraphs */}
            <div className={styles.descSection}>
              <h2 className={styles.sectionLabel}>
                {isEn ? 'Garment Description' : 'Mô tả sản phẩm'}
              </h2>

              {isEn && isTranslating && (
                <div className={styles.translatingNotice}>
                  <span className={styles.translateSpinner} aria-hidden="true" />
                  <span>Translating product details to English...</span>
                </div>
              )}

              {isEn ? (
                translatedHtml ? (
                  <div
                    className={`${styles.descHtml} ${!isDescExpanded ? styles.descTextCollapsed : ''}`}
                    dangerouslySetInnerHTML={{ __html: translatedHtml }}
                  />
                ) : (
                  <div
                    className={`${styles.descText} ${!isDescExpanded ? styles.descTextCollapsed : ''}`}
                  >
                    {product.description_en || product.description}
                  </div>
                )
              ) : product.description_html ? (
                <div
                  className={`${styles.descHtml} ${!isDescExpanded ? styles.descTextCollapsed : ''}`}
                  dangerouslySetInnerHTML={{ __html: product.description_html }}
                />
              ) : (
                <div
                  className={`${styles.descText} ${!isDescExpanded ? styles.descTextCollapsed : ''}`}
                >
                  {product.description}
                </div>
              )}

              {/* Show toggle button if content is long */}
              {((isEn && (translatedHtml || product.description_en)) || product.description) && (
                <button
                  type="button"
                  className={styles.toggleDescBtn}
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                >
                  {isDescExpanded
                    ? (isEn ? 'Show less ↑' : 'Thu gọn ↑')
                    : (isEn ? 'Read more ↓' : 'Xem thêm ↓')}
                </button>
              )}
            </div>

            {/* Actions: Shopee & Share */}
            <div className={styles.actionsWrap}>
              {settings.shopee_url && (
                <a
                  href={settings.shopee_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shopeeBtn}
                  onClick={() => trackContactClick('shopee', settings.shopee_url)}
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

        {/* Other Products Section: 10 items with horizontal scroll */}
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

            <div className={styles.relatedScrollWrapper}>
              <div className={styles.relatedScrollGrid}>
                {relatedProducts.slice(0, 10).map((item) => (
                  <div key={item.id} className={styles.relatedCardItem}>
                    <ProductCard
                      product={item}
                      language={language}
                      onSelectProduct={() => {
                        if (typeof window !== 'undefined') {
                          window.location.href = `/product/${item.uid}`;
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
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

      {/* Size Chart Zoom Modal */}
      {isSizeZoomOpen && sizeChartUrl && (
        <div
          className={styles.sizeModalBackdrop}
          onClick={() => setIsSizeZoomOpen(false)}
        >
          <div
            className={styles.sizeModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.sizeModalCloseBtn}
              onClick={() => setIsSizeZoomOpen(false)}
              aria-label="Close"
            >
              <CloseIcon size={18} />
            </button>
            <div className={styles.sizeModalImgWrap}>
              <img
                src={sizeChartUrl}
                alt={isEn ? `${title} Size Guide` : `Bảng size ${title}`}
                className={styles.sizeModalImg}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
