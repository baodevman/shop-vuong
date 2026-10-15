import translate from 'translate';

// In-memory cache to prevent redundant translations
const translationCache = new Map<string, string>();

// Instant dictionary for common fashion phrases & badges for zero-latency
const dictionaryMap: Record<string, string> = {
  'Đầm ngắn': 'Short Dresses',
  'Đầm dài': 'Maxi & Midi Dresses',
  'Set bộ': 'Matching Sets',
  'Tất cả': 'All Dresses & Sets',
  'Mới': 'NEW',
  'Bán chạy': 'BEST SELLER',
  'Giảm giá': 'SALE',
  'Thủ công': 'ARTISANAL',
  'Giới hạn': 'LIMITED',
};

/**
 * Automatically translates Vietnamese text to English
 * Cached in-memory on the Next.js server
 */
export async function translateToEnglish(text: string): Promise<string> {
  if (!text || !text.trim()) return '';

  const trimmed = text.trim();

  // 1. Check instant dictionary
  if (dictionaryMap[trimmed]) {
    return dictionaryMap[trimmed];
  }

  // 2. Check cache
  if (translationCache.has(trimmed)) {
    return translationCache.get(trimmed)!;
  }

  // 3. Call translation engine (free, no API key needed)
  try {
    const translated = await translate(trimmed, { from: 'vi', to: 'en' });
    if (translated) {
      translationCache.set(trimmed, translated);
      return translated;
    }
  } catch (error) {
    // If translation fails (e.g. offline), return original text safely
  }

  return trimmed;
}

/**
 * Translates an entire product object from Vietnamese to English
 */
export async function translateProductItem(product: {
  title: string;
  description: string;
  badge?: string;
}): Promise<{
  title_en: string;
  description_en: string;
  badge_en?: string;
}> {
  const [title_en, description_en, badge_en] = await Promise.all([
    translateToEnglish(product.title),
    translateToEnglish(product.description),
    product.badge ? translateToEnglish(product.badge) : Promise.resolve(undefined),
  ]);

  return {
    title_en,
    description_en,
    badge_en,
  };
}
