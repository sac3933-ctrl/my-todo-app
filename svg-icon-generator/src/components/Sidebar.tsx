import type { Page } from '../types';

type Props = {
  page: Page;
  onChange: (p: Page) => void;
};

const ITEMS: { id: Page; label: string; icon: JSX.Element }[] = [
  {
    id: 'generator',
    label: '아이콘 생성',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'master',
    label: '기준정보관리',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
  },
];

export default function Sidebar({ page, onChange }: Props) {
  return (
    <aside className="w-56 shrink-0 bg-slate-900 text-slate-100 flex flex-col">
      <div className="px-5 py-5 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            <polyline points="2,8.5 12,15 22,8.5" />
            <line x1="12" y1="15" x2="12" y2="22" />
          </svg>
          <div>
            <div className="text-sm font-bold leading-tight">SVG Icon</div>
            <div className="text-sm font-bold leading-tight text-brand-500">Generator</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3">
        {ITEMS.map(item => {
          const active = item.id === page;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                active
                  ? 'bg-slate-800 text-white border-l-4 border-brand-500'
                  : 'text-slate-300 hover:bg-slate-800 border-l-4 border-transparent'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-3 border-t border-slate-700 text-xs text-slate-400">
        v1.0.0 · PPT 호환 SVG
      </div>
    </aside>
  );
}
