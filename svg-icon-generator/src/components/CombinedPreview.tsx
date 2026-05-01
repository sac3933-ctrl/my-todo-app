import { useMemo } from 'react';
import type { IconDef } from '../lib/iconLibrary';
import type { CombinedRenderResult } from '../lib/svgGenerator';

type Props = {
  combined: CombinedRenderResult;
  icons: IconDef[];
  hoveredId: string | null;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
};

export default function CombinedPreview({
  combined,
  icons,
  hoveredId,
  selectedId,
  onHover,
  onSelect,
}: Props) {
  const overlays = useMemo(() => combined.layout.map((l, idx) => ({
    ...l,
    iconIndex: idx,
    icon: icons[idx],
  })), [combined.layout, icons]);

  return (
    <div className="panel p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">통합 SVG 미리보기</h3>
        <span className="text-xs text-slate-500">
          {icons.length}개 · {combined.width} × {combined.height}px
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-auto rounded-md bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)] bg-[length:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0] border border-slate-200">
        <div className="relative inline-block min-w-full p-4">
          <div
            className="inline-block"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: combined.svg }}
          />
          <svg
            className="absolute top-4 left-4 pointer-events-none"
            width={combined.width}
            height={combined.height}
            viewBox={`0 0 ${combined.width} ${combined.height}`}
          >
            {overlays.map((o, idx) => {
              const active = hoveredId === o.icon.id || selectedId === o.icon.id;
              return (
                <rect
                  key={`${o.icon.id}_${idx}`}
                  x={o.x - 8}
                  y={o.y - 8}
                  width={o.size + 16}
                  height={o.size + 16}
                  rx={6}
                  fill={active ? 'rgba(37,99,235,0.10)' : 'transparent'}
                  stroke={active ? '#2563EB' : 'transparent'}
                  strokeWidth={2}
                  strokeDasharray={hoveredId === o.icon.id ? '4 3' : ''}
                  className="pointer-events-auto cursor-pointer transition-colors"
                  onMouseEnter={() => onHover(o.icon.id)}
                  onMouseLeave={() => onHover(null)}
                  onClick={() => onSelect(o.icon.id)}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
