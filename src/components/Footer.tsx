'use client';

import React from 'react';
import { Language, ShopSettings } from '@/lib/types';
import styles from './Footer.module.css';

interface FooterProps {
  language: Language;
  settings: ShopSettings;
}

export default function Footer({ language, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyText}>
          © {currentYear} {settings.shop_name || 'VƯƠNG SHOP'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
