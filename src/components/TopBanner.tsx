'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopSettings } from '@/lib/types';
import styles from './TopBanner.module.css';

interface TopBannerProps {
  settings: ShopSettings;
}

export default function TopBanner({ settings }: TopBannerProps) {
  if (!settings.top_banner_url) {
    return null;
  }

  const content = (
    <div className={styles.bannerContainer}>
      <Image
        src={settings.top_banner_url}
        alt={settings.shop_name ? `${settings.shop_name} Banner` : 'Banner'}
        width={1920}
        height={480}
        priority
        className={styles.bannerImg}
      />
    </div>
  );

  return (
    <div className={styles.bannerSection}>
      {settings.top_banner_link ? (
        settings.top_banner_link.startsWith('http') ? (
          <a
            href={settings.top_banner_link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bannerLink}
          >
            {content}
          </a>
        ) : (
          <Link href={settings.top_banner_link} className={styles.bannerLink}>
            {content}
          </Link>
        )
      ) : (
        content
      )}
    </div>
  );
}
