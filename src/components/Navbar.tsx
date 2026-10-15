'use client';

import React, { useState } from 'react';
import { Language, ShopSettings } from '@/lib/types';
import {
  GlobeIcon,
  SearchIcon,
  CloseIcon,
  ZaloIcon,
  FacebookIcon,
  InstagramIcon,
} from './FlatIcons';
import styles from './Navbar.module.css';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  settings: ShopSettings;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function Navbar({
  language,
  onToggleLanguage,
  settings,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const isEn = language === 'en';

  const categories = [
    { id: 'all', name: 'Tất cả', name_en: 'All Works' },
    { id: 'tops', name: 'Áo Sơ Mi & Thun', name_en: 'Shirts & Tops' },
    { id: 'bottoms', name: 'Quần & Váy', name_en: 'Trousers' },
    { id: 'dresses', name: 'Đầm Liền', name_en: 'Dresses' },
    { id: 'outerwear', name: 'Áo Khoác', name_en: 'Blazers' },
    { id: 'accessories', name: 'Phụ Kiện', name_en: 'Accessories' },
  ];

  return (
    <header className={styles.header}>
      {/* Top bar announcement */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <p className={styles.announcement}>
            {isEn
              ? 'Complimentary nationwide delivery on orders from 500,000 VND · Pure Natural Fabrics'
              : 'Miễn phí giao hàng toàn quốc từ 500.000đ · Chất liệu sợi tự nhiên 100%'}
          </p>

          <div className={styles.topBarActions}>
            <span className={styles.hotline}>
              Hotline: <strong>{settings.phone}</strong>
            </span>
            <div className={styles.socialTop}>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon size={14} />
              </a>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href={`https://zalo.me/${settings.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Zalo"
                aria-label="Zalo"
              >
                <ZaloIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.logoCol}>
            <a href="/" className={styles.logoLink}>
              <span className={styles.brandTitle}>VƯƠNG</span>
              <span className={styles.brandSub}>ATELIER SHOP</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className={styles.navLinks} aria-label="Product categories">
            {categories.map((c) => {
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  onClick={() => onSelectCategory(c.id)}
                >
                  {isEn ? c.name_en : c.name}
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className={styles.controlsCol}>
            {/* Search Input toggle */}
            <div className={styles.searchWrapper}>
              {showSearch ? (
                <div className={styles.searchBoxActive}>
                  <SearchIcon size={15} color="#888" />
                  <input
                    type="text"
                    placeholder={isEn ? 'Search garments...' : 'Tìm kiếm trang phục...'}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={styles.searchInput}
                    autoFocus
                  />
                  <button
                    type="button"
                    className={styles.searchCloseBtn}
                    onClick={() => {
                      setShowSearch(false);
                      onSearchChange('');
                    }}
                    aria-label="Close search"
                  >
                    <CloseIcon size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => setShowSearch(true)}
                  title={isEn ? 'Search' : 'Tìm kiếm'}
                  aria-label={isEn ? 'Search' : 'Tìm kiếm'}
                >
                  <SearchIcon size={17} />
                </button>
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
              <GlobeIcon size={15} />
              <span className={styles.langCode}>{isEn ? 'EN' : 'VI'}</span>
              <span className={styles.langToggleHint}>
                {isEn ? '→ VI' : '→ EN'}
              </span>
            </button>

            {/* Zalo Direct Button */}
            <a
              href={`https://zalo.me/${settings.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.zaloNavBtn}
              title={isEn ? 'Chat via Zalo' : 'Chat Zalo tư vấn'}
            >
              <ZaloIcon size={15} />
              <span className={styles.zaloNavText}>Zalo</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
