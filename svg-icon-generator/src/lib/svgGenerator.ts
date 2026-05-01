import type { IconDef } from './iconLibrary';
import { iconName } from './iconLibrary';
import type { GenOptions, IconStyle, Lang, MasterDataItem } from '../types';
import { isValidHex } from './validation';

export function resolveStyle(opts: GenOptions, masterData: MasterDataItem[]): IconStyle {
  const colorItem = masterData.find(m => m.category === 'color' && m.value === opts.colorValue && m.enabled);
  const styleItem = masterData.find(m => m.category === 'style' && m.value === opts.styleValue && m.enabled);

  let primary = colorItem?.meta?.primaryColor ?? '#2563EB';
  let secondary = colorItem?.meta?.secondaryColor ?? '#94A3B8';

  if (opts.colorValue === 'custom' && isValidHex(opts.customColor)) {
    primary = opts.customColor;
  }

  const sw = styleItem?.meta?.strokeWidth;
  const strokeWidth = sw ? Number(sw) : 2;
  const duotone = styleItem?.meta?.duotone === 'true';

  return {
    strokeWidth: Number.isFinite(strokeWidth) && strokeWidth > 0 ? strokeWidth : 2,
    primaryColor: primary,
    secondaryColor: secondary,
    duotone,
  };
}

function svgRootAttrs(width: number, height: number, viewBox: string, style: IconStyle, multicolor: boolean): string {
  if (multicolor) {
    return `xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}"`;
  }
  return `xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" fill="none" stroke="${style.primaryColor}" stroke-width="${style.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`;
}

function renderIconBody(icon: IconDef, style: IconStyle): string {
  if (icon.multicolor) return icon.paths;
  if (!style.duotone) return icon.paths;
  const haloWidth = +(style.strokeWidth + 2.5).toFixed(2);
  return `<g stroke="${style.secondaryColor}" stroke-width="${haloWidth}" stroke-opacity="0.5">
${icon.paths}
</g>
<g stroke="${style.primaryColor}" stroke-width="${style.strokeWidth}">
${icon.paths}
</g>`;
}

export function renderSingleSvg(icon: IconDef, style: IconStyle, size = 64): string {
  const vb = icon.viewBox ?? '0 0 64 64';
  const multicolor = !!icon.multicolor;
  return `<svg ${svgRootAttrs(size, size, vb, style, multicolor)}>
${renderIconBody(icon, style)}
</svg>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export type CombinedRenderResult = {
  svg: string;
  layout: { iconId: string; x: number; y: number; size: number }[];
  width: number;
  height: number;
};

function nestedIconBlock(icon: IconDef, style: IconStyle, x: number, y: number, size: number): string {
  const vb = icon.viewBox ?? '0 0 64 64';
  if (icon.multicolor) {
    return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${vb}" overflow="visible">${icon.paths}</svg>`;
  }
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${vb}" overflow="visible">${renderIconBody(icon, style)}</svg>`;
}

export function renderCombinedSvg(
  icons: IconDef[],
  style: IconStyle,
  perRow: number,
  lang: Lang,
): CombinedRenderResult {
  const cellW = 110;
  const cellH = lang === 'none' ? 100 : 132;
  const iconSize = 64;
  const pad = 20;
  const labelGap = 18;

  const cols = Math.min(perRow, Math.max(1, icons.length));
  const rows = Math.ceil(icons.length / cols);
  const width = cols * cellW + pad * 2;
  const height = rows * cellH + pad * 2;

  const layout: CombinedRenderResult['layout'] = [];
  let body = '';

  icons.forEach((icon, idx) => {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    const cx = pad + c * cellW + cellW / 2;
    const topY = pad + r * cellH;
    const x = cx - iconSize / 2;
    const y = topY + 12;

    body += `${nestedIconBlock(icon, style, x, y, iconSize)}\n`;
    layout.push({ iconId: icon.id, x, y, size: iconSize });

    if (lang !== 'none') {
      const labelY = y + iconSize + labelGap;
      body += `<text x="${cx}" y="${labelY}" text-anchor="middle" font-size="13" fill="${style.primaryColor}" stroke="none" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">${escapeXml(iconName(icon, lang))}</text>\n`;
    }
  });

  const svg = `<svg ${svgRootAttrs(width, height, `0 0 ${width} ${height}`, style, false)}>
${body}</svg>`;

  return { svg, layout, width, height };
}
