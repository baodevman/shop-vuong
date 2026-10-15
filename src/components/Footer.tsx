'use client';

import React from 'react';
import Link from 'next/link';
import { Language, ShopSettings } from '@/lib/types';
import { FacebookIcon, InstagramIcon, ShopeeIcon } from './FlatIcons';
import styles from './Footer.module.css';

interface FooterProps {
  language: Language;
  settings: ShopSettings;
}

export default function Footer({ language, settings }: FooterProps) {
  const isEn = language === 'en';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainRow}>
          {/* Logo & Tagline */}
          <div className={styles.logoCol}>
            <Link href="/" className={styles.logoLink}>
              <span className={styles.brandTitle}>{settings.shop_name || 'VƯƠNG SHOP'}</span>
              <span className={styles.brandSub}>
                {isEn ? 'MINIMALIST CLOTHING' : 'THỜI TRANG TỐI GIẢN'}
              </span>
            </Link>
            <p className={styles.address}>
              {isEn ? settings.address_en : settings.address}
            </p>
          </div>

          {/* Quick contact info: Hotline, Facebook, Instagram, Shopee */}
          <div className={styles.contactCol}>
            <div className={styles.hotlineWrap}>
              <span className={styles.hotlineLabel}>
                {isEn ? 'Hotline' : 'Hotline liên hệ'}:
              </span>
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className={styles.hotlineVal}>
                {settings.phone}
              </a>
            </div>

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
                  <span>Facebook</span>
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
                  <span>Instagram</span>
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
                  <span>Shopee</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyText}>
            © {new Date().getFullYear()} {settings.shop_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
