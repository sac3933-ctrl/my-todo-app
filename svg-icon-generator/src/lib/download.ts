import JSZip from 'jszip';
import type { IconDef } from './iconLibrary';
import type { IconStyle } from '../types';
import { renderSingleSvg } from './svgGenerator';

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadSvgString(svg: string, filename: string) {
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  downloadBlob(blob, filename);
}

export async function downloadZip(opts: {
  combinedSvg: string;
  icons: IconDef[];
  style: IconStyle;
  topicLabel: string;
}): Promise<void> {
  const zip = new JSZip();
  zip.file(`combined.svg`, opts.combinedSvg);

  const folder = zip.folder('icons');
  if (folder) {
    const used = new Map<string, number>();
    opts.icons.forEach(icon => {
      const n = (used.get(icon.id) ?? 0) + 1;
      used.set(icon.id, n);
      const suffix = n > 1 ? `_${n}` : '';
      folder.file(`${icon.id}${suffix}.svg`, renderSingleSvg(icon, opts.style));
    });
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const stamp = new Date().toISOString().slice(0, 10);
  downloadBlob(blob, `icons_${opts.topicLabel}_${stamp}.zip`);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
