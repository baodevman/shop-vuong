'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopSettings } from '@/lib/types';
import styles from './TopBanner.module.css';

interface TopBannerProps {
  settings: ShopSettings;
}

const SAMPLE_FALLBACK_BANNER =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop';

export default function TopBanner({ settings }: TopBannerProps) {
  // Use banner from Prismic if uploaded by admin, otherwise use sample fallback banner
  const bannerUrl = settings.top_banner_url || SAMPLE_FALLBACK_BANNER;

  const content = (
    <div className={styles.bannerContainer}>
      <Image
        src={bannerUrl}
        alt={settings.shop_name ? `${settings.shop_name} Banner` : 'VƯƠNG SHOP Banner'}
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
