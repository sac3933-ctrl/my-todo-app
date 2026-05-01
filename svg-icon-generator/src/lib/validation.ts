import type { MasterDataCategory, MasterDataItem } from '../types';

export const HEX_RE = /^#([0-9a-fA-F]{6})$/;

export function isValidHex(v: string): boolean {
  return HEX_RE.test(v.trim());
}

export type ValidationIssue = {
  rowId: string;
  field: string;
  message: string;
};

export function validateCategory(items: MasterDataItem[], category: MasterDataCategory): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const valueCount = new Map<string, number>();
  let defaultCount = 0;

  for (const it of items) {
    if (it.category !== category) continue;
    if (!it.value.trim()) {
      issues.push({ rowId: it.id, field: 'value', message: 'value 비어 있음' });
    } else {
      valueCount.set(it.value, (valueCount.get(it.value) ?? 0) + 1);
    }
    if (!it.labelKo.trim()) {
      issues.push({ rowId: it.id, field: 'labelKo', message: '한국어 라벨 필수' });
    }
    if (it.isDefault) defaultCount += 1;

    if (category === 'color' && it.value !== 'custom' && it.meta?.primaryColor) {
      if (!isValidHex(it.meta.primaryColor)) {
        issues.push({ rowId: it.id, field: 'meta.primaryColor', message: 'HEX 형식 오류 (#RRGGBB)' });
      }
    }
  }

  for (const [val, n] of valueCount) {
    if (n > 1) {
      items
        .filter(i => i.category === category && i.value === val)
        .forEach(i => issues.push({ rowId: i.id, field: 'value', message: `value 중복: ${val}` }));
    }
  }

  if (defaultCount > 1) {
    items
      .filter(i => i.category === category && i.isDefault)
      .forEach(i => issues.push({ rowId: i.id, field: 'isDefault', message: '기본값은 1개만 지정 가능' }));
  }

  return issues;
}
