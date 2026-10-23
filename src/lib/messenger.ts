/**
 * Helper to automatically detect and generate direct Messenger chat links (https://m.me/...)
 * from any Facebook fanpage URL, profile link, or username.
 *
 * Supported formats:
 * - https://facebook.com/mamasg.atelier
 * - https://www.facebook.com/mamasg.atelier/
 * - https://facebook.com/mamasg.atelier?mibextid=ZbWKwL
 * - https://facebook.com/profile.php?id=10008542912
 * - https://m.me/mamasg.atelier
 * - mamasg.atelier
 */
export function resolveMessengerUrl(
  messengerUrl?: string,
  facebookUrl?: string
): string {
  const target = (messengerUrl && messengerUrl.trim()) || (facebookUrl && facebookUrl.trim()) || '';
  if (!target) return '';

  const trimmed = target.trim();

  // If already an m.me link
  if (trimmed.includes('m.me/')) {
    return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
  }

  // If already a messenger.com link
  if (trimmed.includes('messenger.com/t/')) {
    return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
  }

  // Profile ID match (profile.php?id=123456)
  const idMatch = trimmed.match(/[?&]id=(\d+)/);
  if (idMatch && idMatch[1]) {
    return `https://m.me/${idMatch[1]}`;
  }

  // Extract username from URL path
  try {
    let path = trimmed;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const parsed = new URL(trimmed);
      path = parsed.pathname;
    } else if (trimmed.includes('facebook.com/') || trimmed.includes('fb.com/')) {
      path = trimmed.replace(/^.*(?:facebook\.com|fb\.com)\//, '');
    }

    // Split segments and filter out generic system paths
    const segments = path
      .split('/')
      .map((s) => s.trim())
      .filter((s) => s && !['pages', 'p', 'people', 'home.php'].includes(s.toLowerCase()));

    if (segments.length > 0) {
      const cleanUsername = segments[segments.length - 1].split('?')[0].split('#')[0];
      if (cleanUsername) {
        return `https://m.me/${cleanUsername}`;
      }
    }
  } catch {
    // If URL parsing fails, proceed to plain username check
  }

  // Plain username entered (e.g. "mamasg.atelier" or "@mamasg.atelier")
  const cleanUsername = trimmed
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/^facebook\.com\//i, '')
    .replace(/^fb\.com\//i, '')
    .replace(/[@/]/g, '')
    .split('?')[0]
    .split('#')[0]
    .trim();

  if (cleanUsername) {
    return `https://m.me/${cleanUsername}`;
  }

  return '';
}
