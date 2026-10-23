import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'src', 'lib', 'translations-cache.json');

// In-memory cache to prevent redundant translations
const translationCache = new Map<string, string>();

// Load pre-existing translations from disk if available
try {
  if (fs.existsSync(CACHE_FILE)) {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'string') translationCache.set(k, v);
    }
  }
} catch {
  // ignore read error
}

let saveDebounceTimer: NodeJS.Timeout | null = null;
function scheduleSaveCache() {
  if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(() => {
    try {
      const obj = Object.fromEntries(translationCache.entries());
      fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf-8');
    } catch {
      // ignore write error
    }
  }, 500);
}

// Comprehensive fashion dictionary for zero-latency, high-accuracy translation
const dictionaryMap: Record<string, string> = {
  // Navigation & categories
  'Đầm ngắn': 'Short Dresses',
  'Đầm dài': 'Maxi & Midi Dresses',
  'Set bộ': 'Matching Sets',
  'Tất cả': 'All Dresses & Sets',
  'Mới': 'NEW',
  'Bán chạy': 'BEST SELLER',
  'Giảm giá': 'SALE',
  'Thủ công': 'ARTISANAL',
  'Giới hạn': 'LIMITED',

  // Section titles
  'THÔNG TIN SẢN PHẨM': 'PRODUCT INFORMATION',
  'HƯỚNG DẪN VỀ SINH VÀ BẢO QUẢN': 'CARE & CLEANING INSTRUCTIONS',
  'HƯỚNG DẪN VỆ SINH VÀ BẢO QUẢN': 'CARE & CLEANING INSTRUCTIONS',
  'QUY ĐỊNH VỀ BẢO HÀNH VÀ ĐỔI TRẢ SẢN PHẨM': 'WARRANTY & RETURN POLICY',
  '1. Điều kiện áp dụng (trong vòng 03 ngày kể từ khi nhận sản phẩm):': '1. Return conditions (within 03 days of delivery):',
  '2. Trường hợp không đủ điều kiện áp dụng chính sách:': '2. Ineligible conditions:',

  // Attribute labels
  'Thương hiệu:': 'Brand:',
  '- Thương hiệu:': '- Brand:',
  'Chất liệu:': 'Material:',
  '- Chất liệu:': '- Material:',
  'Màu sắc:': 'Color:',
  '- Màu sắc:': '- Color:',
  'Họa tiết:': 'Pattern:',
  '- Họa tiết:': '- Pattern:',
  'Size:': 'Size:',
  '- Size:': '- Size:',
  'Xuất xứ:': 'Origin:',
  '- Xuất xứ:': '- Origin:',
  'Xuất xứ: Việt Nam': 'Origin: Vietnam',
  '- Xuất xứ: Việt Nam': '- Origin: Vietnam',
  '★ Lưu ý:': '★ Note:',
  'Lưu ý:': 'Note:',

  // Patterns & styles
  'Trơn': 'Plain',
  'Họa tiết hoa': 'Floral pattern',
  'Kẻ caro': 'Plaid',
  'Sọc': 'Striped',

  // Materials & Fabrics
  'Lụa lem óng': 'Glossy Silk',
  'Lụa óng': 'Shimmering Silk',
  'Lụa Queen': 'Queen Silk',
  'Lụa nhung gãy': 'Crushed Velvet Silk',
  'Lụa sophia': 'Sophia Silk',
  'Gold tằm trượt': 'Silky Gold Crepe',
  'Lụa': 'Silk',
  'Lụa tơ tằm': 'Mulberry Silk',
  'Linen': 'Linen',
  'Lanh': 'Linen',
  'Cotton': 'Cotton',
  'Ren': 'Lace',
  'Voan': 'Chiffon',
  'Tafta': 'Taffeta',
  'Nhung': 'Velvet',
  'Kaki': 'Khaki',
  'Dạ': 'Tweed',

  // Colors
  'Trắng': 'White',
  'Đen': 'Black',
  'Đen/Xám': 'Black / Grey',
  'Trắng kem': 'Cream White',
  'Nâu/Kem': 'Brown / Cream',
  'Xám Beige': 'Grey Beige',
  'Xanh Biege/Trắng kem': 'Beige Blue / Cream White',
  'Trắng/Đen': 'White / Black',
  'Trắng/Xám/Biege': 'White / Grey / Beige',
  'Nâu đậm/Kem da': 'Dark Brown / Nude Cream',
  'Kem da': 'Nude Cream',
  'Xám': 'Grey',
  'Beige': 'Beige',
  'Biege': 'Beige',
  'Kem': 'Cream',
  'Nâu': 'Brown',
  'Nâu đậm': 'Dark Brown',
  'Hồng': 'Pink',
  'Hồng phấn': 'Pastel Pink',
  'Đỏ': 'Red',
  'Đỏ đô': 'Burgundy Red',
  'Vàng': 'Yellow',
  'Xanh': 'Blue',
  'Xanh rêu': 'Moss Green',
  'Xanh lá': 'Green',
  'Xanh dương': 'Sky Blue',
  'Tím': 'Purple',
  'Cam': 'Orange',
};

// Full sentence replacements for care and warranty guidelines
const phraseReplacements: [string, string][] = [
  [
    'Bảng size chỉ mang tính chất tham khảo, tùy thuộc vào số đo cơ thể mỗi người và chất liệu vải khác nhau sẽ có sự chênh lệch nhất định từ 1-2cm.',
    'The size chart is for reference only. Depending on body measurements and different fabric types, there may be a 1-2cm variance.'
  ],
  [
    'Nên giặt tay, ủi nhẹ.',
    'Hand wash recommended, gentle iron.'
  ],
  [
    'Không nên sử dụng chất tẩy rửa mạnh.',
    'Do not use strong detergents.'
  ],
  [
    'Khuyến khích dùng bàn ủi hơi nước.',
    'Steam ironing is recommended.'
  ],
  [
    'Với các loại sản phẩm có khóa kéo (zipper) và nút cài, kéo khóa và cài nút trước khi giặt.',
    'For items with zippers and buttons, fasten them before washing.'
  ],
  [
    'Hàng đổi không áp dụng đổi mẫu, hỗ trợ đổi size nếu còn.',
    'Exchange for other models not applicable; size exchange supported if in stock.'
  ],
  [
    'Hàng hoá vẫn còn mới, chưa qua sử dụng.',
    'Items must be unworn and unused with tags intact.'
  ],
  [
    'Hàng hóa hư hỏng do vận chuyển hoặc do nhà sản xuất.',
    'Damaged due to shipping or manufacturer defect.'
  ],
  [
    'Hàng không đúng size, kiểu dáng như quý khách đặt hàng.',
    'Incorrect size or style compared to order.'
  ],
  [
    'Không đủ số lượng, không đủ bộ như trong đơn hàng.',
    'Missing items or parts from order.'
  ],
  [
    'Quá 03 ngày kể từ khi quý khách nhận hàng.',
    'More than 03 days after receiving delivery.'
  ],
  [
    'Gửi lại hàng không đúng mẫu mã, không phải hàng của shop.',
    'Returning incorrect items not from our shop.'
  ],
  [
    'Đặt nhầm sản phẩm, chủng loại, không thích, không hợp,…',
    'Accidental order, wrong item selected, change of mind, etc.'
  ],
];

/**
 * Translates a single text fragment/paragraph using dictionary, phrase mapping, and cache
 */
function translateFragment(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  // Direct dictionary hit
  if (dictionaryMap[trimmed]) {
    return dictionaryMap[trimmed];
  }

  // Cache hit
  if (translationCache.has(trimmed)) {
    return translationCache.get(trimmed)!;
  }

  let result = trimmed;

  // Apply phrase replacements
  for (const [from, to] of phraseReplacements) {
    if (result.includes(from)) {
      result = result.replace(from, to);
    }
  }

  // Sort dictionary keys by length descending to match longest phrases first
  const sortedDict = Object.entries(dictionaryMap).sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sortedDict) {
    if (result.includes(from)) {
      result = result.split(from).join(to);
    }
  }

  translationCache.set(trimmed, result);
  scheduleSaveCache();
  return result;
}

/**
 * Automatically translates Vietnamese text to English
 */
export async function translateToEnglish(text: string): Promise<string> {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();

  if (dictionaryMap[trimmed]) return dictionaryMap[trimmed];
  if (translationCache.has(trimmed)) return translationCache.get(trimmed)!;

  // Split lines and translate each line
  const lines = trimmed.split('\n');
  const translated = lines.map((l) => translateFragment(l)).join('\n');

  translationCache.set(trimmed, translated);
  scheduleSaveCache();
  return translated;
}

/**
 * Translates HTML content (preserving <p>, <ul>, <li>, <strong>, etc.)
 */
export async function translateHtmlToEnglish(html: string): Promise<string> {
  if (!html || !html.trim()) return '';

  // Translate inside each <p>...</p>
  let translatedHtml = html.replace(/<p>(.*?)<\/p>/gi, (match, inner) => {
    return `<p>${translateFragment(inner)}</p>`;
  });

  // Translate inside <li>...</li>
  translatedHtml = translatedHtml.replace(/<li>(.*?)<\/li>/gi, (match, inner) => {
    return `<li>${translateFragment(inner)}</li>`;
  });

  return translatedHtml;
}

/**
 * Translates an entire product object from Vietnamese to English (instant)
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
    product.description ? translateToEnglish(product.description) : Promise.resolve(''),
    product.badge ? translateToEnglish(product.badge) : Promise.resolve(undefined),
  ]);

  return {
    title_en,
    description_en,
    badge_en,
  };
}
