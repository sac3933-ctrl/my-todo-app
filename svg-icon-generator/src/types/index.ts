export type MasterDataCategory =
  | 'topic'
  | 'color'
  | 'language'
  | 'style'
  | 'download';

export const CATEGORY_LABELS: Record<MasterDataCategory, string> = {
  topic: '주제',
  color: '색상',
  language: '라벨 언어',
  style: '아이콘 스타일',
  download: '다운로드 방식',
};

export type Lang = 'none' | 'ko' | 'en' | 'ja' | 'zh';

export type MasterDataItem = {
  id: string;
  category: MasterDataCategory;
  labelKo: string;
  labelEn?: string;
  labelJa?: string;
  labelZh?: string;
  value: string;
  description?: string;
  sortOrder: number;
  enabled: boolean;
  isDefault?: boolean;
  meta?: Record<string, string>;
};

export type GenOptions = {
  topicValue: string;
  customTopic: string;
  colorValue: string;
  customColor: string;
  language: Lang;
  styleValue: string;
  downloadValue: string;
};

export type IconStyle = {
  strokeWidth: number;
  primaryColor: string;
  secondaryColor: string;
  duotone: boolean;
};

export type Page = 'generator' | 'master';
