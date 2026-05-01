import type { IconDef } from './iconLibrary';

const BIZ = 'business';
const TECH = 'tech';
const EDU = 'education';
const COMM = 'communication';
const DATA = 'data';
const DESIGN = 'design';
const GEN = 'general';

/**
 * Hand-curated multi-color icons. These ship with embedded fill/stroke and
 * ignore the user's color/style options (multicolor: true).
 *
 * All icons use viewBox 0 0 64 64.
 */
export const CUSTOM_ICONS: IconDef[] = [
  {
    id: 'brand_windows',
    names: { ko: '윈도우', en: 'Windows', ja: 'ウィンドウズ', zh: '视窗' },
    tags: [TECH, GEN],
    multicolor: true,
    paths: `<rect x="6" y="6" width="24" height="24" fill="#F25022" stroke="none"/>
<rect x="34" y="6" width="24" height="24" fill="#7FBA00" stroke="none"/>
<rect x="6" y="34" width="24" height="24" fill="#00A4EF" stroke="none"/>
<rect x="34" y="34" width="24" height="24" fill="#FFB900" stroke="none"/>`,
  },
  {
    id: 'multicolor_pie_chart',
    names: { ko: '컬러 파이차트', en: 'Color Pie', ja: 'カラーパイ', zh: '彩色饼图' },
    tags: [BIZ, DATA, GEN],
    multicolor: true,
    paths: `<path d="M32 32 L32 8 A24 24 0 0 1 53.0 44 Z" fill="#3B82F6" stroke="#FFFFFF" stroke-width="1"/>
<path d="M32 32 L53.0 44 A24 24 0 0 1 11 44 Z" fill="#10B981" stroke="#FFFFFF" stroke-width="1"/>
<path d="M32 32 L11 44 A24 24 0 0 1 11 20 Z" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1"/>
<path d="M32 32 L11 20 A24 24 0 0 1 32 8 Z" fill="#EF4444" stroke="#FFFFFF" stroke-width="1"/>`,
  },
  {
    id: 'multicolor_bar_chart',
    names: { ko: '컬러 막대그래프', en: 'Color Bars', ja: 'カラー棒', zh: '彩色柱图' },
    tags: [BIZ, DATA, GEN],
    multicolor: true,
    paths: `<line x1="6" y1="56" x2="60" y2="56" stroke="#52525B" stroke-width="2" stroke-linecap="round"/>
<rect x="10" y="36" width="10" height="20" fill="#3B82F6" stroke="none"/>
<rect x="24" y="22" width="10" height="34" fill="#10B981" stroke="none"/>
<rect x="38" y="30" width="10" height="26" fill="#F59E0B" stroke="none"/>
<rect x="52" y="14" width="8" height="42" fill="#EF4444" stroke="none"/>`,
  },
  {
    id: 'multicolor_donut_chart',
    names: { ko: '컬러 도넛차트', en: 'Color Donut', ja: 'カラードーナツ', zh: '彩色环形图' },
    tags: [BIZ, DATA, GEN],
    multicolor: true,
    paths: `<circle cx="32" cy="32" r="22" fill="#E2E8F0" stroke="none"/>
<path d="M32 32 L32 10 A22 22 0 0 1 50.5 44 Z" fill="#3B82F6" stroke="none"/>
<path d="M32 32 L50.5 44 A22 22 0 0 1 13.5 44 Z" fill="#10B981" stroke="none"/>
<path d="M32 32 L13.5 44 A22 22 0 0 1 32 10 Z" fill="#F59E0B" stroke="none"/>
<circle cx="32" cy="32" r="10" fill="#FFFFFF" stroke="none"/>`,
  },
  {
    id: 'multicolor_palette',
    names: { ko: '컬러 팔레트', en: 'Color Palette', ja: 'カラーパレット', zh: '调色板' },
    tags: [DESIGN, GEN],
    multicolor: true,
    paths: `<path d="M32 52 C18 52, 8 42, 8 30 C8 18, 18 8, 32 8 C46 8, 56 16, 56 26 C56 32, 50 36, 44 36 H40 C36 36, 36 40, 38 44 C40 48, 38 52, 32 52 Z" fill="#FAFAF9" stroke="#52525B" stroke-width="2" stroke-linejoin="round"/>
<circle cx="20" cy="22" r="3" fill="#EF4444" stroke="none"/>
<circle cx="32" cy="14" r="3" fill="#F59E0B" stroke="none"/>
<circle cx="44" cy="22" r="3" fill="#10B981" stroke="none"/>
<circle cx="46" cy="32" r="3" fill="#3B82F6" stroke="none"/>
<circle cx="22" cy="34" r="3" fill="#A855F7" stroke="none"/>`,
  },
  {
    id: 'color_swatch',
    names: { ko: '색상 카드', en: 'Color Swatch', ja: 'カラースウォッチ', zh: '色卡' },
    tags: [DESIGN],
    multicolor: true,
    paths: `<rect x="8" y="14" width="48" height="8" fill="#EF4444" stroke="#FFFFFF" stroke-width="1"/>
<rect x="8" y="22" width="48" height="8" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1"/>
<rect x="8" y="30" width="48" height="8" fill="#10B981" stroke="#FFFFFF" stroke-width="1"/>
<rect x="8" y="38" width="48" height="8" fill="#3B82F6" stroke="#FFFFFF" stroke-width="1"/>
<rect x="8" y="46" width="48" height="8" fill="#A855F7" stroke="#FFFFFF" stroke-width="1"/>`,
  },
  {
    id: 'traffic_light',
    names: { ko: '신호등', en: 'Traffic Light', ja: '信号', zh: '红绿灯' },
    tags: [GEN],
    multicolor: true,
    paths: `<rect x="22" y="6" width="20" height="52" rx="4" fill="#27272A" stroke="none"/>
<circle cx="32" cy="18" r="6" fill="#EF4444" stroke="none"/>
<circle cx="32" cy="32" r="6" fill="#F59E0B" stroke="none"/>
<circle cx="32" cy="46" r="6" fill="#10B981" stroke="none"/>`,
  },
  {
    id: 'multicolor_target',
    names: { ko: '컬러 과녁', en: 'Color Target', ja: 'カラーターゲット', zh: '彩色靶子' },
    tags: [BIZ, GEN],
    multicolor: true,
    paths: `<circle cx="32" cy="32" r="22" fill="#FECACA" stroke="none"/>
<circle cx="32" cy="32" r="16" fill="#FFFFFF" stroke="none"/>
<circle cx="32" cy="32" r="10" fill="#FECACA" stroke="none"/>
<circle cx="32" cy="32" r="5" fill="#EF4444" stroke="none"/>`,
  },
  {
    id: 'multicolor_lightbulb',
    names: { ko: '컬러 전구', en: 'Yellow Bulb', ja: 'カラー電球', zh: '彩色灯泡' },
    tags: [BIZ, EDU, GEN],
    multicolor: true,
    paths: `<circle cx="32" cy="26" r="14" fill="#FDE68A" stroke="#F59E0B" stroke-width="2"/>
<rect x="26" y="38" width="12" height="6" fill="#A1A1AA" stroke="none"/>
<line x1="28" y1="48" x2="36" y2="48" stroke="#71717A" stroke-width="2" stroke-linecap="round"/>
<line x1="29" y1="54" x2="35" y2="54" stroke="#71717A" stroke-width="2" stroke-linecap="round"/>
<path d="M22 12 L18 8 M42 12 L46 8 M14 26 L8 26 M50 26 L56 26" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>`,
  },
  {
    id: 'multicolor_heart',
    names: { ko: '컬러 하트', en: 'Red Heart', ja: '赤ハート', zh: '红心' },
    tags: [GEN],
    multicolor: true,
    paths: `<path d="M32 52 C18 42, 8 32, 8 22 C8 14, 14 10, 20 10 C26 10, 32 16, 32 16 C32 16, 38 10, 44 10 C50 10, 56 14, 56 22 C56 32, 46 42, 32 52 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2" stroke-linejoin="round"/>`,
  },
  {
    id: 'multicolor_star',
    names: { ko: '컬러 별', en: 'Gold Star', ja: '金星', zh: '金星' },
    tags: [GEN, BIZ],
    multicolor: true,
    paths: `<polygon points="32,8 39,24 56,26 43,38 47,56 32,46 17,56 21,38 8,26 25,24" fill="#FBBF24" stroke="#D97706" stroke-width="2" stroke-linejoin="round"/>`,
  },
  {
    id: 'multicolor_trophy',
    names: { ko: '금 트로피', en: 'Gold Trophy', ja: '金トロフィー', zh: '金奖杯' },
    tags: [BIZ, EDU],
    multicolor: true,
    paths: `<path d="M22 14 H42 V28 C42 36, 38 40, 32 40 C26 40, 22 36, 22 28 Z" fill="#FBBF24" stroke="#B45309" stroke-width="2" stroke-linejoin="round"/>
<path d="M22 18 H14 V24 C14 28, 18 30, 22 30" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round"/>
<path d="M42 18 H50 V24 C50 28, 46 30, 42 30" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round"/>
<rect x="26" y="40" width="12" height="8" fill="#FBBF24" stroke="#B45309" stroke-width="2"/>
<rect x="20" y="48" width="24" height="4" fill="#B45309" stroke="none"/>`,
  },
  {
    id: 'medal_gold',
    names: { ko: '금메달', en: 'Gold Medal', ja: '金メダル', zh: '金牌' },
    tags: [BIZ, EDU],
    multicolor: true,
    paths: `<path d="M22 8 L18 24 L32 32 L46 24 L42 8 Z" fill="#3B82F6" stroke="#1E40AF" stroke-width="2" stroke-linejoin="round"/>
<circle cx="32" cy="42" r="14" fill="#FBBF24" stroke="#B45309" stroke-width="2"/>
<circle cx="32" cy="42" r="8" fill="#FCD34D" stroke="none"/>`,
  },
  {
    id: 'medal_silver',
    names: { ko: '은메달', en: 'Silver Medal', ja: '銀メダル', zh: '银牌' },
    tags: [BIZ, EDU],
    multicolor: true,
    paths: `<path d="M22 8 L18 24 L32 32 L46 24 L42 8 Z" fill="#EF4444" stroke="#991B1B" stroke-width="2" stroke-linejoin="round"/>
<circle cx="32" cy="42" r="14" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
<circle cx="32" cy="42" r="8" fill="#E2E8F0" stroke="none"/>`,
  },
  {
    id: 'medal_bronze',
    names: { ko: '동메달', en: 'Bronze Medal', ja: '銅メダル', zh: '铜牌' },
    tags: [BIZ, EDU],
    multicolor: true,
    paths: `<path d="M22 8 L18 24 L32 32 L46 24 L42 8 Z" fill="#10B981" stroke="#065F46" stroke-width="2" stroke-linejoin="round"/>
<circle cx="32" cy="42" r="14" fill="#D97706" stroke="#92400E" stroke-width="2"/>
<circle cx="32" cy="42" r="8" fill="#F59E0B" stroke="none"/>`,
  },
  {
    id: 'multicolor_alarm',
    names: { ko: '빨간 알람', en: 'Red Alarm', ja: '赤アラーム', zh: '红色闹钟' },
    tags: [COMM, GEN],
    multicolor: true,
    paths: `<circle cx="32" cy="34" r="20" fill="#FEE2E2" stroke="#EF4444" stroke-width="3"/>
<polyline points="32,22 32,34 42,40" fill="none" stroke="#991B1B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<line x1="14" y1="14" x2="20" y2="20" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
<line x1="50" y1="14" x2="44" y2="20" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    id: 'multicolor_calendar_event',
    names: { ko: '컬러 일정', en: 'Calendar Event', ja: 'イベント', zh: '日程' },
    tags: [BIZ, GEN],
    multicolor: true,
    paths: `<rect x="8" y="12" width="48" height="44" rx="3" fill="#FFFFFF" stroke="#475569" stroke-width="2"/>
<rect x="8" y="12" width="48" height="10" fill="#3B82F6" stroke="none"/>
<line x1="20" y1="6" x2="20" y2="16" stroke="#1E40AF" stroke-width="3" stroke-linecap="round"/>
<line x1="44" y1="6" x2="44" y2="16" stroke="#1E40AF" stroke-width="3" stroke-linecap="round"/>
<rect x="22" y="30" width="8" height="8" fill="#EF4444" stroke="none"/>
<rect x="36" y="30" width="8" height="8" fill="#10B981" stroke="none"/>
<rect x="22" y="42" width="8" height="8" fill="#F59E0B" stroke="none"/>`,
  },
  {
    id: 'multicolor_battery_full',
    names: { ko: '배터리 완충', en: 'Battery Full', ja: 'バッテリー満タン', zh: '满电' },
    tags: [TECH, GEN],
    multicolor: true,
    paths: `<rect x="8" y="22" width="44" height="20" rx="3" fill="#FFFFFF" stroke="#475569" stroke-width="2"/>
<rect x="52" y="28" width="4" height="8" fill="#475569" stroke="none"/>
<rect x="11" y="25" width="38" height="14" fill="#10B981" stroke="none"/>`,
  },
  {
    id: 'multicolor_signal',
    names: { ko: '컬러 신호', en: 'Signal Strong', ja: '電波強', zh: '强信号' },
    tags: [TECH, COMM],
    multicolor: true,
    paths: `<rect x="8" y="44" width="8" height="12" fill="#10B981" stroke="none"/>
<rect x="20" y="36" width="8" height="20" fill="#10B981" stroke="none"/>
<rect x="32" y="26" width="8" height="30" fill="#10B981" stroke="none"/>
<rect x="44" y="14" width="8" height="42" fill="#10B981" stroke="none"/>`,
  },
  {
    id: 'multicolor_apple',
    names: { ko: '사과', en: 'Apple', ja: 'りんご', zh: '苹果' },
    tags: [EDU, GEN],
    multicolor: true,
    paths: `<path d="M32 18 C20 14, 10 22, 10 36 C10 46, 18 56, 26 56 C28 56, 30 54, 32 54 C34 54, 36 56, 38 56 C46 56, 54 46, 54 36 C54 22, 44 14, 32 18 Z" fill="#EF4444" stroke="#991B1B" stroke-width="2" stroke-linejoin="round"/>
<path d="M32 18 C32 14, 34 8, 40 8" fill="none" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
<path d="M36 16 C40 16, 42 12, 42 8 C38 8, 34 12, 36 16 Z" fill="#10B981" stroke="#065F46" stroke-width="2" stroke-linejoin="round"/>`,
  },
  {
    id: 'multicolor_smile',
    names: { ko: '웃는 얼굴', en: 'Smile Face', ja: '笑顔', zh: '笑脸' },
    tags: [COMM, GEN],
    multicolor: true,
    paths: `<circle cx="32" cy="32" r="22" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
<circle cx="24" cy="28" r="2.5" fill="#1F2937" stroke="none"/>
<circle cx="40" cy="28" r="2.5" fill="#1F2937" stroke="none"/>
<path d="M22 38 C26 44, 38 44, 42 38" fill="none" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/>`,
  },
  {
    id: 'multicolor_thumbs_up',
    names: { ko: '좋아요', en: 'Thumbs Up', ja: 'いいね', zh: '点赞' },
    tags: [COMM, GEN],
    multicolor: true,
    paths: `<path d="M22 28 L22 52 H44 C46 52, 48 50, 48 48 L52 36 C53 32, 50 28, 46 28 H36 L38 18 C38 14, 36 12, 32 12 L22 28 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2" stroke-linejoin="round"/>
<rect x="10" y="28" width="12" height="24" rx="2" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>`,
  },
  {
    id: 'multicolor_korea_flag',
    names: { ko: '태극기', en: 'Korean Flag', ja: '韓国旗', zh: '韩国国旗' },
    tags: [GEN],
    multicolor: true,
    paths: `<rect x="6" y="14" width="52" height="36" fill="#FFFFFF" stroke="#475569" stroke-width="1"/>
<path d="M32 24 A8 8 0 0 1 32 40 A4 4 0 0 1 32 32 A4 4 0 0 0 32 24 Z" fill="#EF4444" stroke="none"/>
<path d="M32 24 A8 8 0 0 0 32 40 A4 4 0 0 0 32 32 A4 4 0 0 1 32 24 Z" fill="#3B82F6" stroke="none"/>
<g stroke="#1F2937" stroke-width="1.5">
<line x1="14" y1="20" x2="20" y2="20"/>
<line x1="14" y1="22.5" x2="20" y2="22.5"/>
<line x1="14" y1="25" x2="20" y2="25"/>
<line x1="44" y1="20" x2="50" y2="20"/>
<line x1="44" y1="22.5" x2="50" y2="22.5"/>
<line x1="44" y1="25" x2="50" y2="25"/>
<line x1="14" y1="39" x2="20" y2="39"/>
<line x1="14" y1="41.5" x2="20" y2="41.5"/>
<line x1="14" y1="44" x2="20" y2="44"/>
<line x1="44" y1="39" x2="50" y2="39"/>
<line x1="44" y1="41.5" x2="50" y2="41.5"/>
<line x1="44" y1="44" x2="50" y2="44"/>
</g>`,
  },
  {
    id: 'multicolor_globe',
    names: { ko: '컬러 지구', en: 'Color Globe', ja: 'カラー地球', zh: '彩色地球' },
    tags: [BIZ, GEN, EDU],
    multicolor: true,
    paths: `<circle cx="32" cy="32" r="22" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
<path d="M14 28 C18 26, 22 30, 26 28 C30 26, 34 30, 38 28 C42 28, 46 32, 50 30" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
<path d="M16 38 C20 38, 24 42, 30 40 C36 38, 42 42, 48 38" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="32" cy="32" rx="10" ry="22" fill="none" stroke="#1E40AF" stroke-width="1.5"/>`,
  },
  {
    id: 'multicolor_books',
    names: { ko: '컬러 책 더미', en: 'Color Books', ja: 'カラー本', zh: '彩色书' },
    tags: [EDU],
    multicolor: true,
    paths: `<rect x="8" y="44" width="48" height="12" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
<rect x="12" y="32" width="40" height="12" fill="#10B981" stroke="#065F46" stroke-width="2"/>
<rect x="14" y="20" width="36" height="12" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
<rect x="18" y="8" width="28" height="12" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>`,
  },
  {
    id: 'brand_office_word',
    names: { ko: 'Word 문서', en: 'Word', ja: 'Word', zh: 'Word' },
    tags: [BIZ, EDU],
    multicolor: true,
    paths: `<rect x="10" y="8" width="44" height="48" rx="3" fill="#2B579A" stroke="none"/>
<rect x="10" y="8" width="44" height="48" rx="3" fill="none" stroke="#1E3A8A" stroke-width="2"/>
<text x="32" y="42" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle" stroke="none">W</text>`,
  },
  {
    id: 'brand_office_excel',
    names: { ko: 'Excel 문서', en: 'Excel', ja: 'Excel', zh: 'Excel' },
    tags: [BIZ, DATA],
    multicolor: true,
    paths: `<rect x="10" y="8" width="44" height="48" rx="3" fill="#107C41" stroke="none"/>
<rect x="10" y="8" width="44" height="48" rx="3" fill="none" stroke="#064E2C" stroke-width="2"/>
<text x="32" y="42" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle" stroke="none">X</text>`,
  },
  {
    id: 'brand_office_ppt',
    names: { ko: 'PPT 문서', en: 'PowerPoint', ja: 'PowerPoint', zh: 'PowerPoint' },
    tags: [BIZ, EDU],
    multicolor: true,
    paths: `<rect x="10" y="8" width="44" height="48" rx="3" fill="#C43E1C" stroke="none"/>
<rect x="10" y="8" width="44" height="48" rx="3" fill="none" stroke="#7F1D1D" stroke-width="2"/>
<text x="32" y="42" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle" stroke="none">P</text>`,
  },
  {
    id: 'brand_office_outlook',
    names: { ko: 'Outlook', en: 'Outlook', ja: 'Outlook', zh: 'Outlook' },
    tags: [BIZ, COMM],
    multicolor: true,
    paths: `<rect x="10" y="8" width="44" height="48" rx="3" fill="#0078D4" stroke="none"/>
<rect x="10" y="8" width="44" height="48" rx="3" fill="none" stroke="#1E3A8A" stroke-width="2"/>
<text x="32" y="42" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle" stroke="none">O</text>`,
  },
  {
    id: 'brand_youtube',
    names: { ko: '유튜브', en: 'YouTube', ja: 'ユーチューブ', zh: '油管' },
    tags: [COMM, DESIGN],
    multicolor: true,
    paths: `<rect x="6" y="16" width="52" height="32" rx="6" fill="#FF0000" stroke="none"/>
<polygon points="26,24 26,40 42,32" fill="#FFFFFF" stroke="none"/>`,
  },
];
