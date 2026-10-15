'use client';

import React, { useEffect, useState, useTransition, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './PageTransitionLoading.module.css';

function NavigationLoadingWatcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  // Turn off loading whenever route or search parameters finish changing
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  // Intercept local link clicks across the entire app
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore new tab, external links, internal hash jumps, mailto, tel
      if (
        anchor.target === '_blank' ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's an internal route that actually changes the page
      try {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.origin !== window.location.origin) return;

        const currentFull = window.location.pathname + window.location.search;
        const targetFull = targetUrl.pathname + targetUrl.search;

        if (currentFull !== targetFull) {
          setIsNavigating(true);
        }
      } catch {
        // invalid URL string, skip
      }
    };

    document.addEventListener('click', handleLinkClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
    };
  }, []);

  // Safety fallback: auto-turn off after 3.5s if navigation is canceled or immediate
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  return (
    <div
      className={`${styles.loadingOverlay} ${isNavigating ? styles.loadingOverlayActive : ''}`}
      aria-hidden={!isNavigating}
      aria-live="polite"
    >
      <div className={styles.spinnerContainer}>
        <div className={styles.circleSpinner} />
      </div>
    </div>
  );
}

export default function PageTransitionLoading() {
  return (
    <Suspense fallback={null}>
      <NavigationLoadingWatcher />
    </Suspense>
  );
}
