'use client';

import React from 'react';
import { ShopSettings, Language } from '@/lib/types';
import { MessengerIcon } from './FlatIcons';
import { resolveMessengerUrl } from '@/lib/messenger';
import { trackContactClick } from '@/lib/analytics';
import styles from './MessengerBubble.module.css';

interface MessengerBubbleProps {
  settings: ShopSettings;
  language: Language;
}

export default function MessengerBubble({ settings, language }: MessengerBubbleProps) {
  // Automatically detect and convert facebook_url / messenger_url into an m.me direct link
  const messengerUrl =
    resolveMessengerUrl(settings.messenger_url, settings.facebook_url) ||
    'https://m.me/mamasg.atelier';

  const isEn = language === 'en';
  const label = isEn ? 'Chat with us' : 'Chat với Shop';

  return (
    <div className={styles.floatingWrap}>
      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.chatBtn}
        aria-label={label}
        title={label}
        onClick={() => trackContactClick('messenger', messengerUrl)}
      >
        <MessengerIcon size={24} color="#ffffff" />
        <span className={styles.onlineBadge} aria-hidden="true" />
      </a>
      <span className={styles.tooltipPill}>{label}</span>
    </div>
  );
}
