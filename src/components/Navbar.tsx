'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Language, ShopSettings } from '@/lib/types';
import {
  GlobeIcon,
  FacebookIcon,
  InstagramIcon,
  ShopeeIcon,
  MapPinIcon,
  PhoneIcon,
} from './FlatIcons';
import { trackContactClick } from '@/lib/analytics';
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

  const mapsUrl =
    settings.google_maps_url ||
    (settings.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
      : undefined);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand Logo - Bigger size, max bounded to prevent layout shift */}
        <div className={styles.logoCol}>
          <Link href="/" className={styles.logoLink} aria-label={settings.shop_name || 'VƯƠNG SHOP'}>
            {settings.logo_url ? (
              <div className={styles.logoImageWrap}>
                <Image
                  src={settings.logo_url}
                  alt={settings.shop_name || 'Logo'}
                  width={240}
                  height={58}
                  priority
                  className={styles.logoImg}
                />
              </div>
            ) : (
              <>
                <span className={styles.brandTitle}>{settings.shop_name || 'VƯƠNG SHOP'}</span>
                <span className={styles.brandSub}>
                  {isEn ? 'MINIMALIST ATELIER' : 'THỜI TRANG TỐI GIẢN'}
                </span>
              </>
            )}
          </Link>
        </div>

        {/* Quick Contact & Socials: Phone icon, Maps icon, Facebook, Instagram, Shopee */}
        <div className={styles.quickContactCol}>
          <div className={styles.socialGroup}>
            {/* Phone Call Icon Button */}
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className={styles.socialBtn}
                title={isEn ? `Call: ${settings.phone}` : `Gọi ngay: ${settings.phone}`}
                aria-label="Call Phone"
                onClick={() => trackContactClick('phone', settings.phone)}
              >
                <PhoneIcon size={16} />
              </a>
            )}

            {/* Google Maps Icon Button */}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title={isEn ? 'Google Maps Location' : 'Vị trí Google Maps'}
                aria-label="Google Maps"
                onClick={() => trackContactClick('maps', mapsUrl)}
              >
                <MapPinIcon size={17} />
              </a>
            )}

            {/* Facebook */}
            {settings.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Facebook"
                aria-label="Facebook"
                onClick={() => trackContactClick('facebook', settings.facebook_url)}
              >
                <FacebookIcon size={16} />
              </a>
            )}

            {/* Instagram */}
            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Instagram"
                aria-label="Instagram"
                onClick={() => trackContactClick('instagram', settings.instagram_url)}
              >
                <InstagramIcon size={16} />
              </a>
            )}

            {/* Shopee */}
            {settings.shopee_url && (
              <a
                href={settings.shopee_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="Shopee"
                aria-label="Shopee"
                onClick={() => trackContactClick('shopee', settings.shopee_url)}
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
            aria-label="Switch Language"
          >
            <GlobeIcon size={14} />
            <span className={styles.langText}>{isEn ? 'EN' : 'VI'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
