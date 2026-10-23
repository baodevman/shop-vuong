'use client';

import React from 'react';
import { ShopSettings } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from './Navbar';
import TopBanner from './TopBanner';
import Footer from './Footer';

interface ShopLayoutProps {
  settings: ShopSettings;
  children: React.ReactNode;
}

export default function ShopLayout({ settings, children }: ShopLayoutProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        settings={settings}
      />
      <TopBanner settings={settings} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer language={language} settings={settings} />
    </div>
  );
}
