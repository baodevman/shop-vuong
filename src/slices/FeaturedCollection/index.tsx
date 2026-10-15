'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import { mockCategories } from '@/lib/mock-data';
import styles from './FeaturedCollection.module.css';

interface FeaturedCollectionProps {
  slice?: any;
  language: Language;
  onSelectCategory?: (categoryId: string) => void;
  selectedCategory?: string;
}

export default function FeaturedCollection({
  slice,
  language,
  onSelectCategory,
  selectedCategory,
}: FeaturedCollectionProps) {
  const isEn = language === 'en';

  const heading = isEn
    ? slice?.primary?.heading_en || 'CURATED CATEGORIES'
    : slice?.primary?.heading || 'DANH MỤC THỜI TRANG';

  const items = Array.isArray(slice?.items) && slice.items.length > 0
    ? slice.items.map((item: any) => ({
        id: item.category_key || 'tops',
        name: item.title,
        name_en: item.title_en || item.title,
        image: item.image?.url || mockCategories[0].image,
      }))
    : mockCategories;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subTitle}>
            {isEn ? 'ESSENTIAL SELECTIONS' : 'LỰA CHỌN TIÊU BIỂU'}
          </span>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.grid}>
          {items.map((cat: any) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                onClick={() => onSelectCategory?.(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCategory?.(cat.id);
                  }
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={cat.image}
                    alt={isEn ? cat.name_en : cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className={styles.cardImage}
                  />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{isEn ? cat.name_en : cat.name}</h3>
                  <span className={styles.cardAction}>
                    {isEn ? 'View Products' : 'Xem Sản Phẩm'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
