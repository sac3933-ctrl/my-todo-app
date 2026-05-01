import { useState } from 'react';
import MasterDataTable from '../components/MasterDataTable';
import { resetMasterData } from '../lib/storage';
import { CATEGORY_LABELS, type MasterDataCategory, type MasterDataItem } from '../types';

type Props = {
  masterData: MasterDataItem[];
  setMasterData: (items: MasterDataItem[]) => void;
};

const TABS: MasterDataCategory[] = ['topic', 'color', 'language', 'style', 'download'];

export default function MasterData({ masterData, setMasterData }: Props) {
  const [active, setActive] = useState<MasterDataCategory>('topic');

  const onReset = () => {
    if (!confirm('모든 기준정보를 초기 상태로 되돌립니다. 진행할까요?')) return;
    setMasterData(resetMasterData());
  };

  const counts = TABS.reduce<Record<string, number>>((acc, c) => {
    acc[c] = masterData.filter(i => i.category === c).length;
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">기준정보관리</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            아이콘 생성에 사용되는 모든 Select 옵션을 관리합니다. 변경사항은 자동으로 저장됩니다.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary" onClick={onReset}>
            초기 데이터로 복원
          </button>
        </div>
      </header>

      <div className="px-6 pt-4 bg-white border-b border-slate-200">
        <nav className="flex gap-1">
          {TABS.map(t => {
            const isActive = t === active;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={`px-4 py-2 text-sm font-medium rounded-t-md border-b-2 transition-colors ${
                  isActive
                    ? 'text-brand-700 border-brand-600 bg-brand-50/50'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {CATEGORY_LABELS[t]}
                <span className="ml-2 text-xs text-slate-400">({counts[t] ?? 0})</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-6 bg-slate-50">
        <MasterDataTable
          key={active}
          category={active}
          items={masterData}
          onChange={setMasterData}
        />
      </div>
    </div>
  );
}
