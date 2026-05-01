import { useMemo, useState } from 'react';
import type { MasterDataCategory, MasterDataItem } from '../types';
import { isValidHex, validateCategory } from '../lib/validation';

type Props = {
  category: MasterDataCategory;
  items: MasterDataItem[];
  onChange: (items: MasterDataItem[]) => void;
};

type SortField =
  | 'sortOrder' | 'labelKo' | 'labelEn' | 'labelJa' | 'labelZh'
  | 'value' | 'description' | 'enabled' | 'isDefault';

const COLUMN_WIDTHS: Record<string, string> = {
  enabled: 'w-20',
  labelKo: 'min-w-[150px]',
  labelEn: 'min-w-[150px]',
  labelJa: 'min-w-[150px]',
  labelZh: 'min-w-[150px]',
  value: 'min-w-[140px]',
  description: 'min-w-[180px]',
  sortOrder: 'w-24',
  isDefault: 'w-20',
  primaryColor: 'w-32',
  secondaryColor: 'w-32',
  strokeWidth: 'w-24',
  duotone: 'w-20',
  actions: 'w-28',
};

export default function MasterDataTable({ category, items, onChange }: Props) {
  const [sortField, setSortField] = useState<SortField>('sortOrder');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const allOfCategory = useMemo(
    () => items.filter(i => i.category === category),
    [items, category],
  );

  const issues = useMemo(() => validateCategory(items, category), [items, category]);
  const issuesByRow = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const it of issues) {
      if (!m.has(it.rowId)) m.set(it.rowId, []);
      m.get(it.rowId)!.push(`${it.field}: ${it.message}`);
    }
    return m;
  }, [issues]);

  const sorted = useMemo(() => {
    const arr = allOfCategory.slice();
    arr.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      const va = (a as any)[sortField];
      const vb = (b as any)[sortField];
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      const sa = String(va ?? '');
      const sb = String(vb ?? '');
      return sa.localeCompare(sb, 'ko') * dir;
    });
    return arr;
  }, [allOfCategory, sortField, sortDir]);

  const updateRow = (id: string, patch: Partial<MasterDataItem>) => {
    onChange(items.map(i => (i.id === id ? { ...i, ...patch } : i)));
  };

  const updateMeta = (id: string, key: string, value: string) => {
    const target = items.find(i => i.id === id);
    if (!target) return;
    const meta = { ...(target.meta ?? {}), [key]: value };
    updateRow(id, { meta });
  };

  const setDefault = (id: string) => {
    onChange(
      items.map(i =>
        i.category === category ? { ...i, isDefault: i.id === id } : i,
      ),
    );
  };

  const clearDefault = (id: string) => {
    updateRow(id, { isDefault: false });
  };

  const deleteRow = (id: string) => {
    if (!confirm('이 행을 삭제할까요?')) return;
    onChange(items.filter(i => i.id !== id));
  };

  const duplicateRow = (id: string) => {
    const src = items.find(i => i.id === id);
    if (!src) return;
    const newId = `${category}_${Date.now()}`;
    const copy: MasterDataItem = {
      ...src,
      id: newId,
      value: `${src.value}_copy`,
      labelKo: `${src.labelKo} (복사)`,
      isDefault: false,
      sortOrder: src.sortOrder + 5,
    };
    const idx = items.indexOf(src);
    const next = items.slice();
    next.splice(idx + 1, 0, copy);
    onChange(next);
  };

  const moveRow = (id: string, dir: -1 | 1) => {
    const list = sorted;
    const idx = list.findIndex(i => i.id === id);
    if (idx < 0) return;
    const swapWith = list[idx + dir];
    if (!swapWith) return;
    const a = list[idx];
    const aOrder = a.sortOrder;
    const bOrder = swapWith.sortOrder;
    onChange(items.map(i => {
      if (i.id === a.id) return { ...i, sortOrder: bOrder };
      if (i.id === swapWith.id) return { ...i, sortOrder: aOrder };
      return i;
    }));
  };

  const addRow = () => {
    const maxOrder = allOfCategory.reduce((m, i) => Math.max(m, i.sortOrder), 0);
    const newItem: MasterDataItem = {
      id: `${category}_${Date.now()}`,
      category,
      labelKo: '새 항목',
      labelEn: '',
      labelJa: '',
      labelZh: '',
      value: `new_${Date.now().toString(36)}`,
      description: '',
      sortOrder: maxOrder + 10,
      enabled: true,
      isDefault: false,
      meta: category === 'color'
        ? { primaryColor: '#2563EB', secondaryColor: '#94A3B8' }
        : category === 'style'
          ? { strokeWidth: '2', duotone: 'false' }
          : {},
    };
    onChange([...items, newItem]);
  };

  const onHeader = (f: SortField) => {
    if (sortField === f) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(f);
      setSortDir('asc');
    }
  };

  const SortHeader = ({ field, label, className = '' }: { field: SortField; label: string; className?: string }) => (
    <th className={`grid-header ${className}`}>
      <button
        type="button"
        onClick={() => onHeader(field)}
        className="flex items-center gap-1 hover:text-brand-600"
      >
        {label}
        <span className="text-slate-400 text-[10px]">
          {sortField === field ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
        </span>
      </button>
    </th>
  );

  const showColorMeta = category === 'color';
  const showStyleMeta = category === 'style';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          총 <b className="text-slate-800">{allOfCategory.length}</b>개 항목
          {issues.length > 0 && (
            <span className="ml-3 text-red-600">⚠ 검증 오류 {issues.length}건</span>
          )}
        </div>
        <button type="button" className="btn-primary" onClick={addRow}>
          + 행 추가
        </button>
      </div>

      <div className="overflow-auto border border-slate-300 rounded-lg bg-white">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className={`grid-header ${COLUMN_WIDTHS.enabled}`}>
                <button type="button" onClick={() => onHeader('enabled')} className="flex items-center gap-1 hover:text-brand-600">
                  사용
                  <span className="text-slate-400 text-[10px]">{sortField === 'enabled' ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>
                </button>
              </th>
              <SortHeader field="labelKo" label="한국어" className={COLUMN_WIDTHS.labelKo} />
              <SortHeader field="labelEn" label="English" className={COLUMN_WIDTHS.labelEn} />
              <SortHeader field="labelJa" label="日本語" className={COLUMN_WIDTHS.labelJa} />
              <SortHeader field="labelZh" label="中文" className={COLUMN_WIDTHS.labelZh} />
              <SortHeader field="value" label="value" className={COLUMN_WIDTHS.value} />
              <SortHeader field="description" label="설명" className={COLUMN_WIDTHS.description} />
              {showColorMeta && (
                <>
                  <th className={`grid-header ${COLUMN_WIDTHS.primaryColor}`}>Primary HEX</th>
                  <th className={`grid-header ${COLUMN_WIDTHS.secondaryColor}`}>Secondary HEX</th>
                </>
              )}
              {showStyleMeta && (
                <>
                  <th className={`grid-header ${COLUMN_WIDTHS.strokeWidth}`}>strokeWidth</th>
                  <th className={`grid-header ${COLUMN_WIDTHS.duotone}`}>duotone</th>
                </>
              )}
              <SortHeader field="sortOrder" label="순서" className={COLUMN_WIDTHS.sortOrder} />
              <SortHeader field="isDefault" label="기본값" className={COLUMN_WIDTHS.isDefault} />
              <th className={`grid-header ${COLUMN_WIDTHS.actions} text-center`}>관리</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => {
              const rowIssues = issuesByRow.get(row.id) ?? [];
              const hasIssue = rowIssues.length > 0;
              return (
                <tr
                  key={row.id}
                  className={`group transition-colors ${hasIssue ? 'bg-red-50/40' : ''} hover:bg-brand-50/60`}
                  title={rowIssues.join('\n')}
                >
                  <td className="grid-cell text-center">
                    <input
                      type="checkbox"
                      checked={row.enabled}
                      onChange={e => updateRow(row.id, { enabled: e.target.checked })}
                      className="h-4 w-4 accent-brand-600 cursor-pointer"
                    />
                  </td>
                  <td className="grid-cell">
                    <input
                      className="grid-input"
                      value={row.labelKo}
                      onChange={e => updateRow(row.id, { labelKo: e.target.value })}
                    />
                  </td>
                  <td className="grid-cell">
                    <input
                      className="grid-input"
                      value={row.labelEn ?? ''}
                      onChange={e => updateRow(row.id, { labelEn: e.target.value })}
                    />
                  </td>
                  <td className="grid-cell">
                    <input
                      className="grid-input"
                      value={row.labelJa ?? ''}
                      onChange={e => updateRow(row.id, { labelJa: e.target.value })}
                    />
                  </td>
                  <td className="grid-cell">
                    <input
                      className="grid-input"
                      value={row.labelZh ?? ''}
                      onChange={e => updateRow(row.id, { labelZh: e.target.value })}
                    />
                  </td>
                  <td className="grid-cell">
                    <input
                      className="grid-input font-mono text-xs"
                      value={row.value}
                      onChange={e => updateRow(row.id, { value: e.target.value })}
                    />
                  </td>
                  <td className="grid-cell">
                    <input
                      className="grid-input"
                      value={row.description ?? ''}
                      onChange={e => updateRow(row.id, { description: e.target.value })}
                    />
                  </td>
                  {showColorMeta && (
                    <>
                      <td className="grid-cell">
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={isValidHex(row.meta?.primaryColor ?? '') ? (row.meta?.primaryColor ?? '#2563EB') : '#2563EB'}
                            onChange={e => updateMeta(row.id, 'primaryColor', e.target.value.toUpperCase())}
                            className="h-6 w-7 border border-slate-300 rounded cursor-pointer"
                          />
                          <input
                            className={`grid-input font-mono text-xs ${row.meta?.primaryColor && !isValidHex(row.meta.primaryColor) ? 'text-red-600' : ''}`}
                            value={row.meta?.primaryColor ?? ''}
                            onChange={e => updateMeta(row.id, 'primaryColor', e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="grid-cell">
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={isValidHex(row.meta?.secondaryColor ?? '') ? (row.meta?.secondaryColor ?? '#94A3B8') : '#94A3B8'}
                            onChange={e => updateMeta(row.id, 'secondaryColor', e.target.value.toUpperCase())}
                            className="h-6 w-7 border border-slate-300 rounded cursor-pointer"
                          />
                          <input
                            className="grid-input font-mono text-xs"
                            value={row.meta?.secondaryColor ?? ''}
                            onChange={e => updateMeta(row.id, 'secondaryColor', e.target.value)}
                          />
                        </div>
                      </td>
                    </>
                  )}
                  {showStyleMeta && (
                    <>
                      <td className="grid-cell">
                        <input
                          className="grid-input font-mono text-xs"
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="6"
                          value={row.meta?.strokeWidth ?? '2'}
                          onChange={e => updateMeta(row.id, 'strokeWidth', e.target.value)}
                        />
                      </td>
                      <td className="grid-cell text-center">
                        <input
                          type="checkbox"
                          checked={row.meta?.duotone === 'true'}
                          onChange={e => updateMeta(row.id, 'duotone', e.target.checked ? 'true' : 'false')}
                          className="h-4 w-4 accent-brand-600 cursor-pointer"
                        />
                      </td>
                    </>
                  )}
                  <td className="grid-cell">
                    <input
                      className="grid-input text-right font-mono text-xs"
                      type="number"
                      value={row.sortOrder}
                      onChange={e => updateRow(row.id, { sortOrder: Number(e.target.value) || 0 })}
                    />
                  </td>
                  <td className="grid-cell text-center">
                    <input
                      type="radio"
                      name={`default-${category}`}
                      checked={!!row.isDefault}
                      onChange={() => setDefault(row.id)}
                      onClick={() => row.isDefault && clearDefault(row.id)}
                      className="h-4 w-4 accent-brand-600 cursor-pointer"
                    />
                  </td>
                  <td className="grid-cell text-center whitespace-nowrap">
                    <button
                      type="button"
                      title="위로"
                      className="btn-ghost !px-2 !py-1 text-xs"
                      onClick={() => moveRow(row.id, -1)}
                    >▲</button>
                    <button
                      type="button"
                      title="아래로"
                      className="btn-ghost !px-2 !py-1 text-xs"
                      onClick={() => moveRow(row.id, 1)}
                    >▼</button>
                    <button
                      type="button"
                      title="복제"
                      className="btn-ghost !px-2 !py-1 text-xs"
                      onClick={() => duplicateRow(row.id)}
                    >⧉</button>
                    <button
                      type="button"
                      title="삭제"
                      className="text-red-600 hover:bg-red-50 rounded px-2 py-1 text-xs"
                      onClick={() => deleteRow(row.id)}
                    >✕</button>
                  </td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={20} className="grid-cell text-center text-slate-400 py-8">
                  항목이 없습니다. 우측 상단의 <b>행 추가</b> 버튼으로 추가하세요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {issues.length > 0 && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <div className="font-semibold mb-1">⚠ 검증 오류</div>
          <ul className="list-disc list-inside space-y-0.5">
            {issues.slice(0, 6).map((i, idx) => (
              <li key={idx}>[{i.rowId}] {i.field} — {i.message}</li>
            ))}
            {issues.length > 6 && <li>… 외 {issues.length - 6}건</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
