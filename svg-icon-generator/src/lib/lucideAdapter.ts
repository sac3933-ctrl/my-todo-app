import * as lucideAll from 'lucide';
import type { IconDef } from './iconLibrary';

type SVGProps = Record<string, string | number | undefined>;
type IconNode = [tag: string, attrs: SVGProps][];

function isIconNode(value: unknown): value is IconNode {
  if (!Array.isArray(value)) return false;
  if (value.length === 0) return false;
  for (const item of value) {
    if (!Array.isArray(item)) return false;
    if (typeof item[0] !== 'string') return false;
    if (typeof item[1] !== 'object' || item[1] === null) return false;
  }
  return true;
}

function attrsToString(attrs: SVGProps): string {
  return Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join(' ');
}

function nodesToSvgInner(nodes: IconNode): string {
  return nodes.map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)} />`).join('');
}

function pascalToWords(name: string): string {
  return name
    .replace(/([A-Z][a-z])/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const TOPIC_KEYWORDS: { topic: string; re: RegExp }[] = [
  {
    topic: 'business',
    re: /briefcase|building|office|chart|trend|coin|money|dollar|euro|won|yen|pound|banknote|wallet|credit|receipt|tax|calculator|calendar|target|trophy|award|medal|handshake|clipboard|deal|sale|store|shop|mall|tag|ticket|barcode|gavel|scale|truck|box|package|delivery|plane|airplane|invoice|signature|stamp|signpost|presentation|piggy|safe|bank|legal|crown|gem|diamond|rocket|chess|workflow|gantt|scroll|landmark|business|factory|warehouse|forklift|construction|hardhat|hourglass|alarm|notebook-pen|file-pen|file-check|file-signature|file-stack/i,
  },
  {
    topic: 'tech',
    re: /computer|laptop|monitor|screen|desktop|server|database|harddrive|memory|cpu|chip|cloud|wifi|bluetooth|code|terminal|bug|plug|power|battery|smartphone|phone|tablet|usb|cable|cog|gear|setting|lock|unlock|shield|key|fingerprint|globe|antenna|router|signal|webcam|headset|robot|bot|brain|file|folder|disk|drive|airplay|cast|qr|nfc|gpu|app-window|ethernet|network|sync|refresh|zap|circuit|microchip|atom|html|css|gitlab|github|braces|binary|file-code|file-json|monitor-dot|monitor-up|orbit|satellite|radio|server-cog|server-crash|search|search-code|hash|webhook|api|workflow/i,
  },
  {
    topic: 'education',
    re: /book|graduation|cap|library|notebook|pencil|pen-tool|ruler|compass|microscope|atom|dna|test|tube|telescope|abc|alphabet|letter-text|font|read|study|teach|school|university|backpack|whistle|certificate|diploma|drafting|pi|sigma|infinity|equal|divide|percent|globe|flag|history|philosophy|brain|lightbulb|baby|kindergarten|abacus/i,
  },
  {
    topic: 'communication',
    re: /mail|envelope|message|chat|comment|speech|talk|microphone|mic|phone|video|broadcast|radio|tv|antenna|satellite|share|link|hashtag|at-sign|reply|forward|inbox|send|paper-plane|signal|wifi|users|user|bell|sms|podcast|megaphone|loudspeaker|news|rss|alarm|chat-bubble|conversation|sparkles|notebook-tabs|whisper|user-plus|user-minus|user-check|user-x|book-headphones/i,
  },
  {
    topic: 'data',
    re: /database|server|chart|graph|trend|table|grid|spreadsheet|filter|sort|funnel|layers|stack|archive|folder|disk|drive|hash|barcode|qr|cloud|harddrive|backup|sync|copy|paste|sigma|pi|percent|calculator|workflow|node|tree|gauge|meter|activity|pulse|map|globe|radar|file-spreadsheet|columns|rows|kanban|list-tree|file-bar|file-pie|file-line|file-stack|file-search|file-archive|file-json|file-code/i,
  },
  {
    topic: 'design',
    re: /palette|brush|paint|pencil|pen|crop|image|photo|camera|frame|layers|swatch|droplet|color|wand|magic|bezier|vector|grid|ruler|compass|type|font|text|aperture|filter|contrast|saturation|hue|gradient|sticker|sparkle|star|heart|eye|edit|move|rotate|flip|scissors|shapes|circle|square|triangle|hexagon|pentagon|figma|component|spline|brush-cleaning|stamp|signature|highlight|format|align|underline|italic|bold|spacing|line-height|leading/i,
  },
];

const BAD_REGEX = /Replacement|Outline|Sharp|Filled/;

export function buildLucideIcons(): IconDef[] {
  const seen = new Set<IconNode>();
  const seenIds = new Set<string>();
  const result: IconDef[] = [];

  for (const [name, value] of Object.entries(lucideAll as Record<string, unknown>)) {
    if (BAD_REGEX.test(name)) continue;
    if (!isIconNode(value)) continue;
    if (seen.has(value)) continue;
    seen.add(value);

    const id = `l_${name}`;
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    const tags: string[] = [];
    for (const { topic, re } of TOPIC_KEYWORDS) {
      if (re.test(name)) tags.push(topic);
    }
    if (tags.length === 0) tags.push('general');
    if (!tags.includes('general')) tags.push('general');

    const display = pascalToWords(name);

    result.push({
      id,
      names: { ko: display, en: display, ja: display, zh: display },
      tags,
      paths: nodesToSvgInner(value),
      viewBox: '0 0 24 24',
    });
  }

  return result;
}
