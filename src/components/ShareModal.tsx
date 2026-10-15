'use client';

import React, { useState } from 'react';
import { ProductItem, Language } from '@/lib/types';
import {
  FacebookIcon,
  InstagramIcon,
  CopyIcon,
  CheckIcon,
  CloseIcon,
  ShareIcon,
} from './FlatIcons';
import styles from './ShareModal.module.css';

interface ShareModalProps {
  product: ProductItem;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({
  product,
  language,
  isOpen,
  onClose,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const isEn = language === 'en';

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/product/${product.uid}`
    : `https://shop-vuong.vercel.app/product/${product.uid}`;

  const title = isEn ? product.title_en : product.title;
  const priceText = isEn
    ? `$${product.price_usd} USD`
    : `${product.price_vnd.toLocaleString('vi-VN')}đ`;

  const shareText = isEn
    ? `Discover ${title} (${priceText}) at Vuong Shop`
    : `Xem mẫu ${title} (${priceText}) tại Vương Shop`;

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
  };

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${currentUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      window.open('https://www.instagram.com', '_blank');
    } catch {
      // fallback
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: currentUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <ShareIcon size={16} />
            <h3 className={styles.title}>
              {isEn ? 'Share Garment' : 'Chia sẻ sản phẩm'}
            </h3>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={isEn ? 'Close' : 'Đóng'}
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <div className={styles.productSnippet}>
          <span className={styles.productName}>{title}</span>
          <span className={styles.productPrice}>{priceText}</span>
        </div>

        {/* Facebook and Instagram Buttons */}
        <div className={styles.channelGrid}>
          <button
            type="button"
            className={styles.channelButton}
            onClick={handleFacebookShare}
          >
            <FacebookIcon size={20} />
            <span className={styles.channelLabel}>Facebook</span>
          </button>

          <button
            type="button"
            className={styles.channelButton}
            onClick={handleInstagramShare}
          >
            <InstagramIcon size={20} />
            <span className={styles.channelLabel}>Instagram</span>
          </button>
        </div>

        {/* Copy Link Section */}
        <div className={styles.copySection}>
          <input
            type="text"
            readOnly
            value={currentUrl}
            className={styles.urlInput}
          />
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <CheckIcon size={14} />
                <span>{isEn ? 'Copied' : 'Đã chép'}</span>
              </>
            ) : (
              <>
                <CopyIcon size={14} />
                <span>{isEn ? 'Copy' : 'Sao chép'}</span>
              </>
            )}
          </button>
        </div>

        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            type="button"
            className={styles.nativeShareBtn}
            onClick={handleNativeShare}
          >
            <ShareIcon size={14} />
            <span>{isEn ? 'System Share Menu' : 'Tuỳ chọn chia sẻ khác'}</span>
          </button>
        )}

        {copied && (
          <div className={styles.toast}>
            <CheckIcon size={14} />
            <span>{isEn ? 'Link copied to clipboard!' : 'Đã sao chép liên kết vào bộ nhớ tạm!'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
