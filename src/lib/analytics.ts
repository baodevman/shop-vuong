/**
 * Google Analytics 4 (GA4) Tracking Utility
 * Measurement ID: G-3ZSZF8E3W0
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || 'G-3ZSZF8E3W0';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Generic helper to send events to Google Analytics safely
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * 1. Track Contact & External Link Clicks
 * (Hotline, Messenger, Google Maps, Shopee, Facebook, Instagram)
 */
export function trackContactClick(
  channel: 'phone' | 'messenger' | 'maps' | 'shopee' | 'facebook' | 'instagram',
  targetUrlOrValue?: string
) {
  trackEvent('contact_click', {
    channel,
    target: targetUrlOrValue || '',
  });

  // Dedicated events for convenient GA4 conversion funnel tracking
  if (channel === 'phone') {
    trackEvent('click_hotline', { phone_number: targetUrlOrValue });
  } else if (channel === 'messenger') {
    trackEvent('click_messenger', { url: targetUrlOrValue });
  } else if (channel === 'maps') {
    trackEvent('click_maps', { url: targetUrlOrValue });
  } else if (channel === 'shopee') {
    trackEvent('click_shopee', { url: targetUrlOrValue });
  } else if (channel === 'facebook') {
    trackEvent('click_facebook', { url: targetUrlOrValue });
  } else if (channel === 'instagram') {
    trackEvent('click_instagram', { url: targetUrlOrValue });
  }
}

/**
 * 2. Track Language Toggle (VI / EN)
 */
export function trackLanguageChange(language: 'vi' | 'en') {
  trackEvent('change_language', {
    selected_language: language,
  });
}

/**
 * 3. Track Product View (Time spent and views on dresses / sets)
 */
export function trackProductView(product: {
  id: string;
  uid: string;
  title: string;
  price_vnd?: number;
  category?: string;
}) {
  trackEvent('view_item', {
    currency: 'VND',
    value: product.price_vnd || 0,
    items: [
      {
        item_id: product.uid || product.id,
        item_name: product.title,
        item_category: product.category || '',
        price: product.price_vnd || 0,
      },
    ],
  });
}

/**
 * 4. Track Color Variation Selection
 */
export function trackColorSelect(productTitle: string, colorName: string) {
  trackEvent('select_color', {
    product_title: productTitle,
    color_name: colorName,
  });
}
