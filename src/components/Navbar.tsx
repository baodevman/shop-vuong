'use client';

import React from 'react';
import Link from 'next/link';
import { Language, ShopSettings } from '@/lib/types';
import {
  GlobeIcon,
  FacebookIcon,
  InstagramIcon,
  ShopeeIcon,
} from './FlatIcons';
import styles from './Navbar.module.css';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  settings: ShopSettings;
}

export default function Navbar({
  language,
  onToggleLanguage,
  settings,
}: NavbarProps) {
  const isEn = language === 'en';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <div className={styles.logoCol}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.brandTitle}>{settings.shop_name || 'VƯƠNG SHOP'}</span>
            <span className={styles.brandSub}>
              {isEn ? 'MINIMALIST ATELIER' : 'THỜI TRANG TỐI GIẢN'}
            </span>
          </Link>
        </div>

        {/* Quick Contact & Socials: Phone, Facebook, Instagram, Shopee */}
        <div className={styles.quickContactCol}>
          {/* Hotline */}
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className={styles.contactItem}
            title={isEn ? 'Hotline' : 'Số điện thoại'}
          >
            <span className={styles.contactLabel}>{isEn ? 'Tel' : 'Hotline'}:</span>
            <strong className={styles.contactValue}>{settings.phone}</strong>
          </a>

          {/* Social Links */}
          <div className={styles.socialGroup}>
            {settings.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
            )}

            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            )}

            {settings.shopee_url && (
              <a
                href={settings.shopee_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Shopee"
                aria-label="Shopee"
              >
                <ShopeeIcon size={16} />
              </a>
            )}
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            className={styles.langBtn}
            onClick={onToggleLanguage}
            title={isEn ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
            aria-label={isEn ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
          >
            <GlobeIcon size={14} />
            <span className={styles.langText}>{isEn ? 'EN' : 'VI'}</span>
            <span className={styles.langSub}>{isEn ? '→ VI' : '→ EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
