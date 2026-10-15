import React from 'react';
import styles from '@/components/PageTransitionLoading.module.css';

export default function Loading() {
  return (
    <div className={`${styles.loadingOverlay} ${styles.loadingOverlayActive}`} aria-live="polite">
      <div className={styles.spinnerContainer}>
        <div className={styles.circleSpinner} />
      </div>
    </div>
  );
}
