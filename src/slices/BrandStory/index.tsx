'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import styles from './BrandStory.module.css';

interface BrandStoryProps {
  slice?: any;
  language: Language;
}

export default function BrandStory({ slice, language }: BrandStoryProps) {
  const isEn = language === 'en';

  const heading = isEn
    ? 'ATELIER VUONG: REFINEMENT THROUGH SIMPLICITY'
    : 'VƯƠNG SHOP: NGHỆ THUẬT CỦA SỰ TINH TẾ TỐI GIẢN';

  const textParagraph1 = isEn
    ? 'Founded with a deep appreciation for architectural minimalism, Vuong Shop creates conscious garments tailored from natural linen, organic cotton, and fluid tencel fibers.'
    : 'Ra đời từ niềm say mê phong cách tối giản thanh lịch, Vương Shop chú trọng vào những thiết kế may đo chuẩn mực trên nền vải linen tự nhiên, cotton hữu cơ và tencel mềm rủ.';

  const textParagraph2 = isEn
    ? 'Each white hue is chosen to convey calmness and pure focus — celebrating the natural texture of fabrics rather than fleeting ornamentation.'
    : 'Mỗi sắc độ trắng ngà, trắng tinh khôi hay trắng bột được tuyển chọn để tôn vinh sự mộc mạc nguyên bản của chất vải, mang đến sự tự tại tuyệt đối cho người mặc.';

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageBox}>
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
              alt="Atelier Vuong Studio"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <span className={styles.tagline}>{isEn ? 'OUR PHILOSOPHY' : 'TRIẾT LÝ THIẾT KẾ'}</span>
            <h2 className={styles.heading}>{heading}</h2>
            <div className={styles.bodyText}>
              <p>{textParagraph1}</p>
              <p>{textParagraph2}</p>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>{isEn ? 'Pure Natural Fibers' : 'Sợi Tự Nhiên'}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3-4px</span>
                <span className={styles.statLabel}>{isEn ? 'Minimal Clean Lines' : 'Đường Cắt Chuẩn Mực'}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>0%</span>
                <span className={styles.statLabel}>{isEn ? 'Synthetic Dyes' : 'Hóa Chất Tẩy Nhuộm'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
