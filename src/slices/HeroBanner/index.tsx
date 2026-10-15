'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import styles from './HeroBanner.module.css';

interface HeroBannerProps {
  slice?: any;
  language: Language;
  onExploreClick?: () => void;
}

export default function HeroBanner({ slice, language, onExploreClick }: HeroBannerProps) {
  const isEn = language === 'en';
  
  const title = isEn
    ? slice?.primary?.title_en || 'THE ESSENCE OF MINIMALISM'
    : slice?.primary?.title || 'VẺ ĐẸP CỦA SỰ TINH GIẢN';
    
  const subtitle = isEn
    ? slice?.primary?.subtitle_en || 'Curated pure white atelier collection in sustainable linen & organic cotton.'
    : slice?.primary?.subtitle || 'Bộ sưu tập may đo sắc trắng tinh khôi, chất liệu linen & cotton hữu cơ thuần khiết.';
    
  const buttonText = isEn
    ? slice?.primary?.button_text_en || 'EXPLORE COLLECTION'
    : slice?.primary?.button_text || 'KHÁM PHÁ BỘ SƯU TẬP';

  const imageUrl =
    slice?.primary?.banner_image?.url ||
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop';

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>
        <div className={styles.contentCol}>
          <span className={styles.badgeLabel}>
            {isEn ? 'SPRING / SUMMER 2026' : 'MÙA HÈ 2026'}
          </span>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={onExploreClick}
              aria-label={buttonText}
            >
              {buttonText}
            </button>
          </div>
          <div className={styles.metaFeatures}>
            <div className={styles.featureItem}>
              <span className={styles.featureDot} />
              <span>{isEn ? '100% Natural Fabrics' : '100% Vải sợi tự nhiên'}</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureDot} />
              <span>{isEn ? 'Artisanal Tailoring' : 'Đường may đo thủ công'}</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureDot} />
              <span>{isEn ? 'Monochrome White Tone' : 'Tông trắng tinh khiết'}</span>
            </div>
          </div>
        </div>

        <div className={styles.visualCol}>
          <div className={styles.imageFrame}>
            <Image
              src={imageUrl}
              alt="Vuong Shop Summer Collection"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.heroImage}
            />
            <div className={styles.imageBadge}>
              <span className={styles.taglineSmall}>ATELIER VUONG</span>
              <span className={styles.taglineSub}>EDITION 01</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
