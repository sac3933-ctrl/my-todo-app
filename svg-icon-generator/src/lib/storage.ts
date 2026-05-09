import type { MasterDataItem } from '../types';
import { INITIAL_MASTER_DATA } from './initialData';

const STORAGE_KEY = 'svg-icon-generator:masterData:v2';
const OPTIONS_KEY = 'svg-icon-generator:lastOptions:v2';

export function loadMasterData(): MasterDataItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveMasterData(INITIAL_MASTER_DATA);
      return clone(INITIAL_MASTER_DATA);
    }
    const parsed = JSON.parse(raw) as MasterDataItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveMasterData(INITIAL_MASTER_DATA);
      return clone(INITIAL_MASTER_DATA);
    }
    return parsed;
  } catch {
    return clone(INITIAL_MASTER_DATA);
  }
}

export function saveMasterData(items: MasterDataItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function resetMasterData(): MasterDataItem[] {
  saveMasterData(INITIAL_MASTER_DATA);
  return clone(INITIAL_MASTER_DATA);
}

export function loadLastOptions<T>(): T | null {
  try {
    const raw = localStorage.getItem(OPTIONS_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveLastOptions<T>(opts: T) {
  localStorage.setItem(OPTIONS_KEY, JSON.stringify(opts));
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}
