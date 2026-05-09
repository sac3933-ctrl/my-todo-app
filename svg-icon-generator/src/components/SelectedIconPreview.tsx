import { useState } from 'react';
import type { IconDef } from '../lib/iconLibrary';
import { iconName } from '../lib/iconLibrary';
import type { IconStyle, Lang } from '../types';
import { renderSingleSvg } from '../lib/svgGenerator';
import { copyToClipboard, downloadSvgString } from '../lib/download';

type Props = {
  icon: IconDef | null;
  style: IconStyle;
  language: Lang;
};

export default function SelectedIconPreview({ icon, style, language }: Props) {
  const [copied, setCopied] = useState(false);

  if (!icon) {
    return (
      <div className="panel p-4 h-full flex items-center justify-center text-sm text-slate-500">
        아이콘을 마우스로 가리키거나 클릭하면 여기에 표시됩니다.
      </div>
    );
  }

  const svg = renderSingleSvg(icon, style, 128);
  const displayName = iconName(icon, language === 'none' ? 'ko' : language);

  const onCopy = async () => {
    const ok = await copyToClipboard(svg);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="panel p-4 h-full flex gap-4">
      <div className="shrink-0 w-40 h-40 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="mb-2">
          <div className="text-base font-semibold text-slate-800">{displayName}</div>
          <div className="text-xs text-slate-500 mt-0.5">id: {icon.id} · 태그: {icon.tags.join(', ')}</div>
        </div>
        <textarea
          readOnly
          value={svg}
          className="flex-1 min-h-0 font-mono text-[11px] leading-snug text-slate-700 bg-slate-50 border border-slate-200 rounded p-2 resize-none"
        />
        <div className="flex items-center gap-2 mt-2">
          <button type="button" className="btn-secondary" onClick={onCopy}>
            {copied ? '✓ 복사됨' : 'SVG 코드 복사'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => downloadSvgString(svg, `${icon.id}.svg`)}
          >
            이 아이콘만 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
