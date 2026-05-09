import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import OptionPanel from '../components/OptionPanel';
import CombinedPreview from '../components/CombinedPreview';
import SelectedIconPreview from '../components/SelectedIconPreview';
import { pickIconsForTopic } from '../lib/iconLibrary';
import { renderCombinedSvg, renderSingleSvg, resolveStyle } from '../lib/svgGenerator';
import { downloadSvgString, downloadZip } from '../lib/download';
import { loadLastOptions, saveLastOptions } from '../lib/storage';
import { isValidHex } from '../lib/validation';
import type { GenOptions, MasterDataItem } from '../types';

type Props = {
  masterData: MasterDataItem[];
};

const CELL_WIDTH = 110;
const PREVIEW_HORIZONTAL_PADDING = 56;

function defaultOptions(masterData: MasterDataItem[]): GenOptions {
  const dflt = (cat: string, fallback: string) => {
    const def = masterData.find(m => m.category === cat && m.enabled && m.isDefault);
    if (def) return def.value;
    const first = masterData.find(m => m.category === cat && m.enabled);
    return first?.value ?? fallback;
  };

  return {
    topicValue: dflt('topic', 'business'),
    customTopic: '',
    colorValue: dflt('color', 'blue'),
    customColor: '#2563EB',
    language: dflt('language', 'none') as GenOptions['language'],
    styleValue: dflt('style', 'round'),
    downloadValue: dflt('download', 'combined'),
  };
}

export default function IconGenerator({ masterData }: Props) {
  const [options, setOptions] = useState<GenOptions>(() => {
    const saved = loadLastOptions<GenOptions>();
    return saved ?? defaultOptions(masterData);
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const previewWrapRef = useRef<HTMLDivElement>(null);
  const [perRow, setPerRow] = useState(4);

  useLayoutEffect(() => {
    const el = previewWrapRef.current;
    if (!el) return;

    const compute = (width: number) => {
      const usable = Math.max(0, width - PREVIEW_HORIZONTAL_PADDING);
      const next = Math.max(1, Math.min(12, Math.floor(usable / CELL_WIDTH)));
      setPerRow(prev => (prev === next ? prev : next));
    };

    compute(el.clientWidth);
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        compute(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIsGenerated(false);
    saveLastOptions(options);
  }, [options]);

  const icons = useMemo(
    () => pickIconsForTopic(options.topicValue, options.customTopic),
    [options.topicValue, options.customTopic],
  );
  const style = useMemo(() => resolveStyle(options, masterData), [options, masterData]);
  const combined = useMemo(
    () => renderCombinedSvg(icons, style, perRow, options.language),
    [icons, style, perRow, options.language],
  );

  const activeIcon =
    icons.find(i => i.id === hoveredId) ??
    icons.find(i => i.id === selectedId) ??
    icons[0] ??
    null;

  const customColorInvalid = options.colorValue === 'custom' && !isValidHex(options.customColor);
  const canGenerate = !customColorInvalid && icons.length > 0;
  const canDownload = isGenerated && canGenerate;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setIsGenerated(true);
    if (!selectedId && icons[0]) setSelectedId(icons[0].id);
  };

  const handleDownload = async () => {
    if (!canDownload) return;
    const stamp = new Date().toISOString().slice(0, 10);
    const topicLabel = options.topicValue === 'custom' && options.customTopic
      ? options.customTopic.replace(/\s+/g, '_')
      : options.topicValue;

    if (options.downloadValue === 'combined') {
      downloadSvgString(combined.svg, `combined_${topicLabel}_${stamp}.svg`);
    } else if (options.downloadValue === 'selected') {
      const target = activeIcon ?? icons[0];
      if (target) {
        downloadSvgString(renderSingleSvg(target, style), `${target.id}_${stamp}.svg`);
      }
    } else if (options.downloadValue === 'zip') {
      await downloadZip({
        combinedSvg: combined.svg,
        icons,
        style,
        topicLabel,
      });
    }
  };

  return (
    <div className="h-full flex">
      <section className="w-80 shrink-0 border-r border-slate-200 bg-white overflow-y-auto p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">아이콘 생성</h2>
        <p className="text-xs text-slate-500 mb-5">
          옵션을 변경하면 미리보기가 즉시 업데이트됩니다. 생성 버튼을 누르면 다운로드가 활성화됩니다.
        </p>
        <OptionPanel
          masterData={masterData}
          options={options}
          setOptions={setOptions}
          iconCount={icons.length}
          perRow={perRow}
        />
      </section>

      <section className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 grid grid-rows-[3fr_2fr] gap-4 p-5 overflow-hidden">
          <div className="min-h-0" ref={previewWrapRef}>
            <CombinedPreview
              combined={combined}
              icons={icons}
              hoveredId={hoveredId}
              selectedId={selectedId}
              onHover={setHoveredId}
              onSelect={setSelectedId}
            />
          </div>
          <div className="min-h-0">
            <SelectedIconPreview
              icon={activeIcon}
              style={style}
              language={options.language}
            />
          </div>
        </div>

        <footer className="border-t border-slate-200 bg-white px-5 py-3 flex items-center justify-between">
          <div className="text-sm">
            {isGenerated ? (
              <span className="text-emerald-600 font-medium">✓ 생성 완료 — 다운로드 가능</span>
            ) : (
              <span className="text-slate-500">옵션 확정 후 <b className="text-slate-700">생성</b> 버튼을 눌러주세요</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleGenerate}
              disabled={!canGenerate}
            >
              생성
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleDownload}
              disabled={!canDownload}
            >
              다운로드
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
