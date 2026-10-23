'use client';

import React from 'react';
import { ShopSettings } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import TopBanner from './TopBanner';
import Footer from './Footer';
import MessengerBubble from './MessengerBubble';

interface ShopLayoutProps {
  settings: ShopSettings;
  children: React.ReactNode;
}

export default function ShopLayout({ settings, children }: ShopLayoutProps) {
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        settings={settings}
      />
      {isHomePage && <TopBanner settings={settings} />}
      <main style={{ flex: 1 }}>{children}</main>
      <Footer language={language} settings={settings} />
      <MessengerBubble settings={settings} language={language} />
    </div>
  );
}
