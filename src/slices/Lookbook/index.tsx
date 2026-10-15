'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import styles from './Lookbook.module.css';

interface LookbookProps {
  slice?: any;
  language: Language;
}

export default function Lookbook({ slice, language }: LookbookProps) {
  const isEn = language === 'en';

  const title = isEn
    ? slice?.primary?.title_en || 'LOOKBOOK SUMMER 2026'
    : slice?.primary?.title || 'LOOKBOOK HÈ 2026 — SẮC TRẮNG THUẦN KHIẾT';

  const quote = isEn
    ? 'Simplicity is about subtracting the obvious and adding the meaningful.'
    : slice?.primary?.quote || 'Sự tối giản không phải là thiếu hụt, mà là sự hoàn hảo khi không còn gì để lược bớt.';

  const looks = [
    {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      caption: isEn ? 'Look 01: Pure Tailored Wide Trouser & Linen Top' : 'Look 01: Quần Âu Trắng Rủ & Áo Dệt Linen',
    },
    {
      url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
      caption: isEn ? 'Look 02: Column Maxi Slip with Natural Textures' : 'Look 02: Đầm Suông Dáng Dài Thuần Khiết',
    },
    {
      url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      caption: isEn ? 'Look 03: Deconstructed Cotton Blazer Silhouette' : 'Look 03: Blazer Tối Giản Thoáng Mát',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subTitle}>EDITORIAL LOOKBOOK</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
        </div>

        <div className={styles.gallery}>
          {looks.map((look, idx) => (
            <div key={idx} className={styles.lookCard}>
              <div className={styles.imageBox}>
                <Image
                  src={look.url}
                  alt={look.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.lookInfo}>
                <span className={styles.lookIndex}>0{idx + 1}</span>
                <span className={styles.lookCaption}>{look.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
