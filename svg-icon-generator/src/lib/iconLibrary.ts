import type { Lang } from '../types';
import { CUSTOM_ICONS } from './customIcons';
import { buildLucideIcons } from './lucideAdapter';

export type IconDef = {
  id: string;
  names: { ko: string; en: string; ja: string; zh: string };
  tags: string[];
  paths: string;
  /** SVG viewBox; defaults to '0 0 64 64'. Lucide icons use '0 0 24 24'. */
  viewBox?: string;
  /**
   * If true, the icon ships with its own fill/stroke colors and the user's
   * color/style options are ignored for this icon.
   */
  multicolor?: boolean;
};

export function iconName(icon: IconDef, lang: Lang): string {
  if (lang === 'none') return icon.names.en;
  if (lang === 'ko') return icon.names.ko;
  if (lang === 'en') return icon.names.en;
  if (lang === 'ja') return icon.names.ja;
  return icon.names.zh;
}

const lucideIcons = buildLucideIcons();
export const ICON_LIBRARY: IconDef[] = [...CUSTOM_ICONS, ...lucideIcons];

export function getIconById(id: string): IconDef | undefined {
  return ICON_LIBRARY.find(i => i.id === id);
}

const MAX_DISPLAY = 100;

export function pickIconsForTopic(topic: string, customKeyword: string): IconDef[] {
  let pool: IconDef[];

  if (topic === 'general') {
    pool = ICON_LIBRARY.slice();
  } else if (topic === 'custom') {
    const kw = customKeyword.trim().toLowerCase();
    if (!kw) {
      pool = ICON_LIBRARY.slice();
    } else {
      const matched = ICON_LIBRARY.filter(i =>
        i.id.toLowerCase().includes(kw) ||
        i.names.ko.toLowerCase().includes(kw) ||
        i.names.en.toLowerCase().includes(kw) ||
        i.tags.some(t => t.includes(kw)),
      );
      pool = matched.length > 0 ? matched : ICON_LIBRARY.slice();
    }
  } else {
    const matched = ICON_LIBRARY.filter(i => i.tags.includes(topic));
    pool = matched.length > 0 ? matched : ICON_LIBRARY.slice();
  }

  const seen = new Set<string>();
  const unique: IconDef[] = [];
  for (const icon of pool) {
    if (seen.has(icon.id)) continue;
    seen.add(icon.id);
    unique.push(icon);
    if (unique.length >= MAX_DISPLAY) break;
  }
  return unique;
}
