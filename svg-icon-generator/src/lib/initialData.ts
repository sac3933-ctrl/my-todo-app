import type { MasterDataItem } from '../types';

const id = (cat: string, value: string) => `${cat}_${value}`;

export const INITIAL_MASTER_DATA: MasterDataItem[] = [
  // ── 주제 ─────────────────────────────────────────────
  {
    id: id('topic', 'business'), category: 'topic',
    labelKo: '비즈니스', labelEn: 'Business', labelJa: 'ビジネス', labelZh: '商务',
    value: 'business', description: '차트, 회의, 트로피 등',
    sortOrder: 10, enabled: true, isDefault: true,
  },
  {
    id: id('topic', 'tech'), category: 'topic',
    labelKo: '기술', labelEn: 'Technology', labelJa: 'テクノロジー', labelZh: '技术',
    value: 'tech', description: '컴퓨터, 클라우드, 코드',
    sortOrder: 20, enabled: true,
  },
  {
    id: id('topic', 'education'), category: 'topic',
    labelKo: '교육', labelEn: 'Education', labelJa: '教育', labelZh: '教育',
    value: 'education', description: '책, 학사모, 펜',
    sortOrder: 30, enabled: true,
  },
  {
    id: id('topic', 'communication'), category: 'topic',
    labelKo: '소통', labelEn: 'Communication', labelJa: 'コミュニケーション', labelZh: '沟通',
    value: 'communication', description: '메일, 전화, 채팅',
    sortOrder: 40, enabled: true,
  },
  {
    id: id('topic', 'data'), category: 'topic',
    labelKo: '데이터', labelEn: 'Data', labelJa: 'データ', labelZh: '数据',
    value: 'data', description: '차트, 데이터베이스',
    sortOrder: 50, enabled: true,
  },
  {
    id: id('topic', 'design'), category: 'topic',
    labelKo: '디자인', labelEn: 'Design', labelJa: 'デザイン', labelZh: '设计',
    value: 'design', description: '팔레트, 카메라',
    sortOrder: 60, enabled: true,
  },
  {
    id: id('topic', 'general'), category: 'topic',
    labelKo: '일반', labelEn: 'General', labelJa: '一般', labelZh: '通用',
    value: 'general', description: '범용 아이콘',
    sortOrder: 70, enabled: true,
  },
  {
    id: id('topic', 'custom'), category: 'topic',
    labelKo: '사용자 지정', labelEn: 'Custom', labelJa: 'カスタム', labelZh: '自定义',
    value: 'custom', description: '직접 키워드 입력',
    sortOrder: 999, enabled: true,
  },

  // ── 색상 ─────────────────────────────────────────────
  {
    id: id('color', 'blue'), category: 'color',
    labelKo: '파란색', labelEn: 'Blue', labelJa: 'ブルー', labelZh: '蓝色',
    value: 'blue', sortOrder: 10, enabled: true, isDefault: true,
    meta: { primaryColor: '#2563EB', secondaryColor: '#94A3B8' },
  },
  {
    id: id('color', 'green'), category: 'color',
    labelKo: '초록색', labelEn: 'Green', labelJa: 'グリーン', labelZh: '绿色',
    value: 'green', sortOrder: 20, enabled: true,
    meta: { primaryColor: '#16A34A', secondaryColor: '#86EFAC' },
  },
  {
    id: id('color', 'red'), category: 'color',
    labelKo: '빨간색', labelEn: 'Red', labelJa: 'レッド', labelZh: '红色',
    value: 'red', sortOrder: 30, enabled: true,
    meta: { primaryColor: '#DC2626', secondaryColor: '#FCA5A5' },
  },
  {
    id: id('color', 'purple'), category: 'color',
    labelKo: '보라색', labelEn: 'Purple', labelJa: 'パープル', labelZh: '紫色',
    value: 'purple', sortOrder: 40, enabled: true,
    meta: { primaryColor: '#7C3AED', secondaryColor: '#C4B5FD' },
  },
  {
    id: id('color', 'orange'), category: 'color',
    labelKo: '주황색', labelEn: 'Orange', labelJa: 'オレンジ', labelZh: '橙色',
    value: 'orange', sortOrder: 50, enabled: true,
    meta: { primaryColor: '#EA580C', secondaryColor: '#FED7AA' },
  },
  {
    id: id('color', 'gray'), category: 'color',
    labelKo: '회색', labelEn: 'Gray', labelJa: 'グレー', labelZh: '灰色',
    value: 'gray', sortOrder: 60, enabled: true,
    meta: { primaryColor: '#475569', secondaryColor: '#CBD5E1' },
  },
  {
    id: id('color', 'black'), category: 'color',
    labelKo: '검정', labelEn: 'Black', labelJa: 'ブラック', labelZh: '黑色',
    value: 'black', sortOrder: 70, enabled: true,
    meta: { primaryColor: '#0F172A', secondaryColor: '#94A3B8' },
  },
  {
    id: id('color', 'custom'), category: 'color',
    labelKo: '사용자 지정', labelEn: 'Custom', labelJa: 'カスタム', labelZh: '自定义',
    value: 'custom', description: 'HEX 직접 입력',
    sortOrder: 999, enabled: true,
    meta: { primaryColor: '#000000', secondaryColor: '#94A3B8' },
  },

  // ── 라벨 언어 ────────────────────────────────────────
  {
    id: id('language', 'none'), category: 'language',
    labelKo: '표시 안 함', labelEn: 'None', labelJa: '非表示', labelZh: '不显示',
    value: 'none', sortOrder: 10, enabled: true, isDefault: true,
  },
  {
    id: id('language', 'ko'), category: 'language',
    labelKo: '한국어', labelEn: 'Korean', labelJa: '韓国語', labelZh: '韩语',
    value: 'ko', sortOrder: 20, enabled: true,
  },
  {
    id: id('language', 'en'), category: 'language',
    labelKo: '영어', labelEn: 'English', labelJa: '英語', labelZh: '英语',
    value: 'en', sortOrder: 30, enabled: true,
  },
  {
    id: id('language', 'ja'), category: 'language',
    labelKo: '일본어', labelEn: 'Japanese', labelJa: '日本語', labelZh: '日语',
    value: 'ja', sortOrder: 40, enabled: true,
  },
  {
    id: id('language', 'zh'), category: 'language',
    labelKo: '중국어', labelEn: 'Chinese', labelJa: '中国語', labelZh: '中文',
    value: 'zh', sortOrder: 50, enabled: true,
  },

  // ── 아이콘 스타일 ─────────────────────────────────────
  {
    id: id('style', 'round'), category: 'style',
    labelKo: '기본 (round)', labelEn: 'Round', labelJa: 'ラウンド', labelZh: '圆角',
    value: 'round', description: '기본 strokeWidth=2',
    sortOrder: 10, enabled: true, isDefault: true,
    meta: { strokeWidth: '2', duotone: 'false' },
  },
  {
    id: id('style', 'thin'), category: 'style',
    labelKo: '가는선', labelEn: 'Thin', labelJa: '細線', labelZh: '细线',
    value: 'thin', sortOrder: 20, enabled: true,
    meta: { strokeWidth: '1.5', duotone: 'false' },
  },
  {
    id: id('style', 'bold'), category: 'style',
    labelKo: '굵은선', labelEn: 'Bold', labelJa: '太線', labelZh: '粗线',
    value: 'bold', sortOrder: 30, enabled: true,
    meta: { strokeWidth: '3', duotone: 'false' },
  },
  {
    id: id('style', 'duotone'), category: 'style',
    labelKo: '듀오톤', labelEn: 'Duotone', labelJa: 'デュオトーン', labelZh: '双色',
    value: 'duotone', description: 'primary + secondary',
    sortOrder: 40, enabled: true,
    meta: { strokeWidth: '2', duotone: 'true' },
  },

  // ── 다운로드 방식 ─────────────────────────────────────
  {
    id: id('download', 'combined'), category: 'download',
    labelKo: '통합 SVG만', labelEn: 'Combined SVG', labelJa: '統合SVG', labelZh: '合并SVG',
    value: 'combined', sortOrder: 10, enabled: true, isDefault: true,
  },
  {
    id: id('download', 'selected'), category: 'download',
    labelKo: '선택 아이콘만', labelEn: 'Selected only', labelJa: '選択のみ', labelZh: '仅选中',
    value: 'selected', sortOrder: 20, enabled: true,
  },
  {
    id: id('download', 'zip'), category: 'download',
    labelKo: '전체 ZIP', labelEn: 'Full ZIP', labelJa: '全ZIP', labelZh: '全部ZIP',
    value: 'zip', description: '통합 + 개별 SVG 묶음',
    sortOrder: 30, enabled: true,
  },
];
