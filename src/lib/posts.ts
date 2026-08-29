import { marked } from 'marked';

const EXCERPT_START = '<!--excerpt.start-->';
const EXCERPT_END = '<!--excerpt.end-->';

/**
 * Mirrors the old Jekyll `excerpt.html`/`reading-time-cal.html` includes, which
 * both operated on `post.content` — the *rendered* HTML, not the raw markdown
 * source. That distinction matters: the "Blog's tips/trick" post demonstrates
 * the excerpt-marker syntax inside a backtick code span, so the literal marker
 * text appears in the raw markdown but gets HTML-escaped once rendered. Working
 * off rendered HTML (like Jekyll did) means that demo text is correctly ignored
 * instead of being mistaken for a real excerpt delimiter.
 */
function toHtml(rawBody: string): string {
  return marked.parse(rawBody, { async: false }) as string;
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getExcerpt(rawBody: string, truncateWords = 25): string {
  const html = toHtml(rawBody);
  if (html.includes(EXCERPT_START) && html.includes(EXCERPT_END)) {
    const middle = html.split(EXCERPT_START)[1]!.split(EXCERPT_END)[0]!;
    return htmlToPlainText(middle);
  }
  const words = htmlToPlainText(html).split(' ').filter(Boolean);
  const truncated = words.slice(0, truncateWords).join(' ');
  return words.length > truncateWords ? `${truncated}…` : truncated;
}

export function getReadingTimeLabel(rawBody: string): string {
  const words = htmlToPlainText(toHtml(rawBody)).split(' ').filter(Boolean).length;
  const clamped = Math.max(words, 200);
  const minutes = Math.floor(clamped / 200);
  return `${minutes} phút đọc`;
}

/**
 * Jekyll's permalink uses the post's frontmatter `date` (not the filename date)
 * for the /YYYY/MM/DD/ portion of the URL, while the slug always comes from the
 * filename. Two migrated posts have a frontmatter date that differs from their
 * filename date, so these must stay separate to keep the old URLs intact.
 */
export function slugFromId(id: string): string {
  const match = id.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  if (!match) {
    throw new Error(`Post filename "${id}" must start with YYYY-MM-DD-`);
  }
  return match[1]!;
}

export function datePathParts(date: Date): { year: string; month: string; day: string } {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return { year, month, day };
}

export function postHref(id: string, date: Date): string {
  const { year, month, day } = datePathParts(date);
  return `/${year}/${month}/${day}/${slugFromId(id)}/`;
}

/** `featured_image` wins when set; otherwise falls back to the first image in the post body. */
export function getThumbnail(rawBody: string, featuredImage?: string): string | undefined {
  if (featuredImage) return `/assets/images/${featuredImage}`;
  const match = rawBody.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
  return match?.[1];
}

export const CATEGORIES = ['art', 'script', 'guide', 'game'] as const;
export type Category = (typeof CATEGORIES)[number];
