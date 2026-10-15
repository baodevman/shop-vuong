'use client';

import React from 'react';
import { Language, ShopSettings } from '@/lib/types';
import { FacebookIcon, InstagramIcon, ZaloIcon } from './FlatIcons';
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
        <div className={styles.grid}>
          {/* Col 1: Brand */}
          <div className={styles.brandCol}>
            <span className={styles.brandName}>VƯƠNG ATELIER</span>
            <p className={styles.tagline}>
              {isEn ? settings.tagline_en : settings.tagline_vi}
            </p>
            <p className={styles.address}>
              {isEn ? settings.address_en : settings.address_vi}
            </p>
          </div>

          {/* Col 2: Customer care */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>
              {isEn ? 'CUSTOMER SERVICE' : 'DỊCH VỤ KHÁCH HÀNG'}
            </h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#how-to-order">
                  {isEn ? 'Ordering & Tailoring Guide' : 'Hướng dẫn đặt may & chọn size'}
                </a>
              </li>
              <li>
                <a href="#shipping">
                  {isEn ? 'Shipping & Returns' : 'Chính sách giao nhận & đổi size'}
                </a>
              </li>
              <li>
                <a href="#fabric-care">
                  {isEn ? 'Natural Linen Care Tips' : 'Cách bảo quản sợi vải tự nhiên'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Headless Prismic info */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>
              {isEn ? 'HEADLESS CMS' : 'HỆ THỐNG QUẢN TRỊ'}
            </h4>
            <p className={styles.cmsText}>
              {isEn
                ? 'Powered by Prismic Headless CMS at hub-cms.prismic.io.'
                : 'Tích hợp headless Prismic CMS tại hub-cms.prismic.io.'}
            </p>
            <div className={styles.cmsBadge}>
              <span className={styles.cmsDot} />
              <span>hub-cms.prismic.io</span>
            </div>
          </div>

          {/* Col 4: Contact & Social */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>
              {isEn ? 'CONNECT WITH US' : 'KẾT NỐI VỚI VƯƠNG'}
            </h4>
            <p className={styles.phoneText}>
              Hotline: <strong>{settings.phone}</strong>
            </p>
            <div className={styles.socialButtons}>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
                <span>Facebook</span>
              </a>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
              </a>
              <a
                href={`https://zalo.me/${settings.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Zalo"
                aria-label="Zalo"
              >
                <ZaloIcon size={16} />
                <span>Zalo</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} VƯƠNG SHOP. All rights reserved. Minimalist clothing shop.
          </p>
          <div className={styles.bottomLinks}>
            <span>{isEn ? 'Privacy Policy' : 'Chính sách bảo mật'}</span>
            <span>·</span>
            <span>{isEn ? 'Terms of Atelier' : 'Điều khoản tiệm'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
