import type { GenOptions, Lang, MasterDataItem } from '../types';
import { isValidHex } from '../lib/validation';

type Props = {
  masterData: MasterDataItem[];
  options: GenOptions;
  setOptions: (next: GenOptions) => void;
  iconCount: number;
  perRow: number;
};

function selectableItems(md: MasterDataItem[], category: string): MasterDataItem[] {
  return md
    .filter(i => i.category === category && i.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export default function OptionPanel({ masterData, options, setOptions, iconCount, perRow }: Props) {
  const topics = selectableItems(masterData, 'topic');
  const colors = selectableItems(masterData, 'color');
  const languages = selectableItems(masterData, 'language');
  const styles = selectableItems(masterData, 'style');
  const downloads = selectableItems(masterData, 'download');

  const update = <K extends keyof GenOptions>(k: K, v: GenOptions[K]) => {
    setOptions({ ...options, [k]: v });
  };

  const isCustomTopic = options.topicValue === 'custom';
  const isCustomColor = options.colorValue === 'custom';
  const customColorOk = !isCustomColor || isValidHex(options.customColor);

  return (
    <div className="space-y-5">
      <div>
        <label className="form-label">아이콘 주제</label>
        <select
          className="form-select"
          value={options.topicValue}
          onChange={e => update('topicValue', e.target.value)}
        >
          {topics.map(t => (
            <option key={t.id} value={t.value}>{t.labelKo}</option>
          ))}
        </select>
        {isCustomTopic && (
          <input
            type="text"
            className="form-input mt-2"
            placeholder="키워드 입력 (예: cloud, chart, mail)"
            value={options.customTopic}
            onChange={e => update('customTopic', e.target.value)}
          />
        )}
      </div>

      <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 leading-relaxed">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700">현재 미리보기</span>
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="text-slate-500">표시 아이콘</div>
          <div className="text-slate-800 font-mono">{iconCount} 개</div>
          <div className="text-slate-500">한 줄 자동</div>
          <div className="text-slate-800 font-mono">{perRow} 개</div>
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          미리보기 영역 너비에 맞춰 한 줄 개수가 자동 조절됩니다.
        </div>
      </div>

      <div>
        <label className="form-label">색상</label>
        <select
          className="form-select"
          value={options.colorValue}
          onChange={e => update('colorValue', e.target.value)}
        >
          {colors.map(c => (
            <option key={c.id} value={c.value}>{c.labelKo}</option>
          ))}
        </select>
        {isCustomColor && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="h-9 w-12 rounded border border-slate-300 cursor-pointer"
                value={isValidHex(options.customColor) ? options.customColor : '#2563EB'}
                onChange={e => update('customColor', e.target.value.toUpperCase())}
              />
              <input
                type="text"
                placeholder="#2563EB"
                className={`form-input ${customColorOk ? '' : 'border-red-400 ring-1 ring-red-400'}`}
                value={options.customColor}
                onChange={e => update('customColor', e.target.value)}
              />
            </div>
            {!customColorOk && (
              <div className="text-xs text-red-600">유효한 HEX (#RRGGBB) 형식이 아닙니다.</div>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="form-label">라벨 언어</label>
        <select
          className="form-select"
          value={options.language}
          onChange={e => update('language', e.target.value as Lang)}
        >
          {languages.map(l => (
            <option key={l.id} value={l.value}>{l.labelKo}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">아이콘 스타일</label>
        <select
          className="form-select"
          value={options.styleValue}
          onChange={e => update('styleValue', e.target.value)}
        >
          {styles.map(s => (
            <option key={s.id} value={s.value}>{s.labelKo}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">다운로드 방식</label>
        <select
          className="form-select"
          value={options.downloadValue}
          onChange={e => update('downloadValue', e.target.value)}
        >
          {downloads.map(d => (
            <option key={d.id} value={d.value}>{d.labelKo}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
