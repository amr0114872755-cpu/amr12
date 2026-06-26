// Free public CDN — fawazahmed0/hadith-api on jsdelivr.
// Religious texts (1200+ years old, public domain). Freely-licensed compilation.

const BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';

export type HadithItem = {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  reference?: { book: number; hadith: number };
  grades?: { name: string; grade: string }[];
};

export type SectionDetail = {
  hadithnumber_first: number;
  hadithnumber_last: number;
  arabicnumber_first: number;
  arabicnumber_last: number;
};

export type BookMetadata = {
  name: string;
  sections: Record<string, string>;
  section_details: Record<string, SectionDetail>;
};

export type SectionResponse = {
  metadata: { name: string; section: Record<string, string>; section_detail: Record<string, SectionDetail> };
  hadiths: HadithItem[];
};

export type FullBookResponse = {
  metadata: BookMetadata;
  hadiths: HadithItem[];
};

/**
 * Offline-first. Hadith books are bundled in `public/data/hadith/{slug}.json`
 * so the APK works without network. We still fall back to the remote CDN
 * if a particular book wasn't bundled (e.g. user enabled a new book).
 */
async function loadBundledBook(apiSlug: string): Promise<FullBookResponse | null> {
  try {
    const r = await fetch(`/data/hadith/${apiSlug}.json`, { cache: 'force-cache' });
    if (r.ok) return (await r.json()) as FullBookResponse;
  } catch {
    // ignore — fall through to remote
  }
  return null;
}

async function loadRemoteBook(apiSlug: string): Promise<FullBookResponse> {
  const res = await fetch(`${BASE}/ara-${apiSlug}.min.json`);
  if (!res.ok) throw new Error('Failed to load book');
  return (await res.json()) as FullBookResponse;
}

// Memoize per-slug so we don't re-parse the (potentially 9MB) file repeatedly.
const bookCache = new Map<string, Promise<FullBookResponse>>();
function getBook(apiSlug: string): Promise<FullBookResponse> {
  let p = bookCache.get(apiSlug);
  if (!p) {
    p = (async () => (await loadBundledBook(apiSlug)) ?? loadRemoteBook(apiSlug))();
    bookCache.set(apiSlug, p);
  }
  return p;
}

export async function fetchBookMetadata(apiSlug: string): Promise<BookMetadata> {
  const data = await getBook(apiSlug);
  return data.metadata;
}

export async function fetchFullBook(apiSlug: string): Promise<FullBookResponse> {
  return getBook(apiSlug);
}

export async function fetchSection(apiSlug: string, sectionId: string): Promise<SectionResponse> {
  // Derive the requested section locally from the bundled book — no extra
  // network call required.
  const book = await getBook(apiSlug);
  const detail = book.metadata.section_details[sectionId];
  const sectionName = book.metadata.sections[sectionId];
  const hadiths = detail
    ? book.hadiths.filter(
        h => h.hadithnumber >= detail.hadithnumber_first && h.hadithnumber <= detail.hadithnumber_last,
      )
    : [];
  return {
    metadata: {
      name: book.metadata.name,
      section: { [sectionId]: sectionName ?? '' },
      section_detail: detail ? { [sectionId]: detail } : {},
    },
    hadiths,
  };
}
