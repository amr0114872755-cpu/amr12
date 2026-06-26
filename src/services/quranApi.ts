import type { Surah, SurahDetail, Reciter } from '@/types/quran';

const BASE_URL = 'https://api.alquran.cloud/v1';

/**
 * ============================================================================
 * QURAN AUDIO SYSTEM v4.0 — Ported from verified noor1-al-quran reference
 * ============================================================================
 *
 * Rule: a reciter only ever falls back to MIRRORS OF THE SAME RECITER.
 * We never silently swap one sheikh's voice for another (no more
 * "Alafasy plays for everybody" bug).
 *
 * Two source types:
 *  - mp3quran.net  → full-surah mp3 (https://serverN.mp3quran.net/{folder}/SSS.mp3)
 *  - cdn.islamic.network (audio-surah edition) → full-surah mp3 keyed by edition id
 *    with a secondary bitrate (128↔64) of the SAME reciter as fallback
 */

type AudioSource =
  | { kind: 'mp3quran'; folder: string; servers: number[] }
  | { kind: 'islamic'; editionId: string; bitrate: 128 | 64 };

interface ReciterAudio {
  reciter: Reciter;
  sources: AudioSource[];
}

const RECITER_TABLE: ReciterAudio[] = [
  {
    reciter: { id: 'alafasy', identifier: 'ar.alafasy', name: 'Mishary Rashid Alafasy', arabicName: 'مشاري راشد العفاسي', englishName: 'Mishary Rashid Alafasy', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'afs', servers: [8] },
      { kind: 'islamic', editionId: 'ar.alafasy', bitrate: 128 },
      { kind: 'islamic', editionId: 'ar.alafasy', bitrate: 64 },
    ],
  },
  {
    reciter: { id: 'abdulbasit', identifier: 'ar.abdulbasitmurattal', name: 'Abdul Basit Abdus Samad', arabicName: 'عبد الباسط عبد الصمد', englishName: 'Abdul Basit Abdus Samad', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'basit', servers: [7] },
      { kind: 'islamic', editionId: 'ar.abdulbasitmurattal', bitrate: 128 },
      { kind: 'islamic', editionId: 'ar.abdulbasitmurattal', bitrate: 64 },
    ],
  },
  {
    reciter: { id: 'maher', identifier: 'ar.mahermuaiqly', name: 'Maher Al Muaiqly', arabicName: 'ماهر المعيقلي', englishName: 'Maher Al Muaiqly', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'maher', servers: [12] },
    ],
  },
  {
    reciter: { id: 'shuraim', identifier: 'ar.saoodshuraym', name: 'Saud Al-Shuraim', arabicName: 'سعود الشريم', englishName: 'Saud Al-Shuraim', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'shur', servers: [7] },
    ],
  },
  {
    reciter: { id: 'sudais', identifier: 'ar.abdurrahmaansudais', name: 'Abdul Rahman Al-Sudais', arabicName: 'عبد الرحمن السديس', englishName: 'Abdul Rahman Al-Sudais', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'sds', servers: [11] },
      { kind: 'islamic', editionId: 'ar.abdurrahmaansudais', bitrate: 64 },
      { kind: 'islamic', editionId: 'ar.abdurrahmaansudais', bitrate: 128 },
    ],
  },
  {
    reciter: { id: 'ahmed', identifier: 'ar.ahmedajamy', name: 'Ahmed Al Ajami', arabicName: 'أحمد العجمي', englishName: 'Ahmed Al Ajami', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'ajm', servers: [10] },
    ],
  },
  {
    reciter: { id: 'hudhaify', identifier: 'ar.hudhaify', name: 'Ali Al-Hudhaify', arabicName: 'علي الحذيفي', englishName: 'Ali Al-Hudhaify', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'hthfi', servers: [9] },
    ],
  },
  {
    reciter: { id: 'husary', identifier: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', arabicName: 'محمود خليل الحصري', englishName: 'Mahmoud Khalil Al-Husary', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'husr', servers: [13] },
    ],
  },
  {
    reciter: { id: 'minshawi', identifier: 'ar.minshawi', name: 'Mohamed Siddiq Al-Minshawi', arabicName: 'محمد صديق المنشاوي', englishName: 'Mohamed Al Minshawi', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'minsh', servers: [10] },
    ],
  },
  {
    reciter: { id: 'ayyoub', identifier: 'ar.muhammadayyoub', name: 'Muhammad Ayyoub', arabicName: 'محمد أيوب', englishName: 'Muhammad Ayyoub', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'ayyub', servers: [8] },
    ],
  },
  {
    reciter: { id: 'jibreel', identifier: 'ar.muhammadjibreel', name: 'Muhammad Jibreel', arabicName: 'محمد جبريل', englishName: 'Muhammad Jibreel', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'jbrl', servers: [8] },
    ],
  },
  {
    reciter: { id: 'hanirifai', identifier: 'ar.hanirifai', name: 'Hani Ar-Rifai', arabicName: 'هاني الرفاعي', englishName: 'Hani Ar-Rifai', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'hani', servers: [8] },
    ],
  },
  {
    reciter: { id: 'shaatree', identifier: 'ar.shaatree', name: 'Abu Bakr Al-Shaatree', arabicName: 'أبو بكر الشاطري', englishName: 'Abu Bakr Al-Shaatree', language: 'ar' },
    sources: [
      { kind: 'mp3quran', folder: 'shatri', servers: [11] },
    ],
  },
  {
    reciter: { id: 'yasser', identifier: 'mp3q.yasser', name: 'Yasser Al Dosari', arabicName: 'ياسر الدوسري', englishName: 'Yasser Al Dosari', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'yasser', servers: [11] }],
  },
  {
    reciter: { id: 'saad', identifier: 'mp3q.s_gmd', name: 'Saad Al Ghamdi', arabicName: 'سعد الغامدي', englishName: 'Saad Al Ghamdi', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 's_gmd', servers: [7] }],
  },
  {
    reciter: { id: 'islam', identifier: 'mp3q.islam', name: 'Islam Sobhi', arabicName: 'إسلام صبحي', englishName: 'Islam Sobhi', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'islam/Rewayat-Hafs-A-n-Assem', servers: [14] }],
  },
  {
    reciter: { id: 'idrees', identifier: 'mp3q.abkr', name: 'Idrees Abkar', arabicName: 'إدريس أبكر', englishName: 'Idrees Abkar', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'abkr', servers: [6] }],
  },
  {
    reciter: { id: 'balilah', identifier: 'mp3q.balilah', name: 'Bandar Balilah', arabicName: 'بندر بليلة', englishName: 'Bandar Balilah', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'balilah', servers: [6] }],
  },
  {
    reciter: { id: 'fares', identifier: 'mp3q.frs_a', name: 'Fares Abbad', arabicName: 'فارس عباد', englishName: 'Fares Abbad', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'frs_a', servers: [8] }],
  },
  {
    reciter: { id: 'nasser', identifier: 'mp3q.qtm', name: 'Nasser Al Qatami', arabicName: 'ناصر القطامي', englishName: 'Nasser Al Qatami', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'qtm', servers: [6] }],
  },
  {
    reciter: { id: 'hazza', identifier: 'mp3q.hazza', name: 'Hazza Al Balushi', arabicName: 'هزاع البلوشي', englishName: 'Hazza Al Balushi', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'hazza', servers: [11] }],
  },
  {
    reciter: { id: 'alijaber', identifier: 'mp3q.a_jbr', name: 'Ali Jaber', arabicName: 'علي جابر', englishName: 'Ali Jaber', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'a_jbr', servers: [11] }],
  },
  {
    reciter: { id: 'jhn', identifier: 'mp3q.jhn', name: 'Abdullah Al-Juhany', arabicName: 'عبد الله الجهني', englishName: 'Abdullah Al-Juhany', language: 'ar' },
    sources: [{ kind: 'mp3quran', folder: 'jhn', servers: [13] }],
  },
];

export const RECITERS: Reciter[] = RECITER_TABLE.map(r => r.reciter);

const pad3 = (n: number) => String(n).padStart(3, '0');

function urlsFor(source: AudioSource, surahNumber: number): string[] {
  if (source.kind === 'mp3quran') {
    return source.servers.map(
      s => `https://server${s}.mp3quran.net/${source.folder}/${pad3(surahNumber)}.mp3`,
    );
  }
  return [
    `https://cdn.islamic.network/quran/audio-surah/${source.bitrate}/${source.editionId}/${surahNumber}.mp3`,
  ];
}

function reciterEntry(identifier: string): ReciterAudio | undefined {
  return RECITER_TABLE.find(r => r.reciter.identifier === identifier);
}

export function getAllAudioUrls(surahNumber: number, reciterIdentifier: string): string[] {
  const entry = reciterEntry(reciterIdentifier);
  if (!entry) return [];
  const urls: string[] = [];
  for (const src of entry.sources) urls.push(...urlsFor(src, surahNumber));
  return Array.from(new Set(urls));
}

export function getAudioUrl(surahNumber: number, reciterIdentifier: string, fallbackLevel = 0): string {
  const urls = getAllAudioUrls(surahNumber, reciterIdentifier);
  if (urls.length === 0) return '';
  return urls[Math.min(fallbackLevel, urls.length - 1)];
}

export function getAyahAudioUrl(surahNumber: number, ayahNumber: number, reciterIdentifier: string): string {
  // Full-surah CDNs (mp3quran / islamic-network audio-surah) don't expose per-ayah files.
  // Use everyayah.com per-ayah mirrors where the reciter exists, keyed by the SAME reciter only.
  const ayahFolders: Record<string, string> = {
    'ar.alafasy': 'Alafasy_128kbps',
    'ar.abdulbasitmurattal': 'Abdul_Basit_Murattal_192kbps',
    'ar.mahermuaiqly': 'MaherAlMuaiqly128kbps',
    'ar.ahmedajamy': 'ahmed_ibn_ali_al_ajamy_128kbps',
    'ar.husary': 'Husary_128kbps',
    'ar.minshawi': 'Minshawy_Murattal_128kbps',
    'ar.saoodshuraym': 'Saood_ash-Shuraym_128kbps',
    'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais_192kbps',
    'ar.hudhaify': 'Hudhaify_128kbps',
    'ar.muhammadayyoub': 'Muhammad_Ayyoub_128kbps',
    'ar.muhammadjibreel': 'Muhammad_Jibreel_128kbps',
    'ar.hanirifai': 'Hani_Rifai_192kbps',
    'ar.shaatree': 'Abu_Bakr_Ash-Shaatree_128kbps',
    'mp3q.yasser': 'Yasser_Ad-Dussary_128kbps',
    'mp3q.s_gmd': 'Ghamadi_40kbps',
    'mp3q.abkr': 'Abdullaah_3awwaad_Al-Juhaynee_128kbps',
    'mp3q.frs_a': 'Fares_Abbad_64kbps',
    'mp3q.qtm': 'Nasser_Alqatami_128kbps',
    'mp3q.a_jbr': 'Ali_Jaber_64kbps',
  };
  const folder = ayahFolders[reciterIdentifier];
  if (!folder) {
    // No per-ayah mirror for this reciter — fall back to full-surah file (same reciter only).
    return getAudioUrl(surahNumber, reciterIdentifier, 0);
  }
  return `https://everyayah.com/data/${folder}/${pad3(surahNumber)}${pad3(ayahNumber)}.mp3`;
}

/**
 * Offline-first fetch helper.
 *  1) Try the bundled JSON shipped under `public/data/` — works without
 *     network in the Capacitor APK and in the deployed web app.
 *  2) Fall back to the remote API only if the local file is missing
 *     (e.g. a new translation that isn't bundled).
 */
async function fetchLocalFirst<T>(
  localPath: string,
  remoteUrl: string,
  pickRemote: (json: unknown) => T,
): Promise<T> {
  try {
    const local = await fetch(localPath, { cache: 'force-cache' });
    if (local.ok) return (await local.json()) as T;
  } catch {
    // ignore — fall through to remote
  }
  const response = await fetch(remoteUrl);
  if (!response.ok) throw new Error('فشل في تحميل البيانات');
  const data = await response.json();
  return pickRemote(data);
}

export async function fetchSurahs(): Promise<Surah[]> {
  return fetchLocalFirst<Surah[]>(
    '/data/quran/surahs.json',
    `${BASE_URL}/surah`,
    (json) => (json as { data: Surah[] }).data,
  );
}

export async function fetchSurah(surahNumber: number, edition = 'quran-uthmani'): Promise<SurahDetail> {
  // The bundled local file is the default `quran-uthmani` edition.
  if (edition === 'quran-uthmani') {
    return fetchLocalFirst<SurahDetail>(
      `/data/quran/surah-${surahNumber}.json`,
      `${BASE_URL}/surah/${surahNumber}/${edition}`,
      (json) => (json as { data: SurahDetail }).data,
    );
  }
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/${edition}`);
  if (!response.ok) throw new Error('فشل في تحميل السورة');
  const data = await response.json();
  return data.data;
}

export async function fetchSurahText(surahNumber: number): Promise<SurahDetail> {
  return fetchLocalFirst<SurahDetail>(
    `/data/quran/surah-${surahNumber}.json`,
    `${BASE_URL}/surah/${surahNumber}`,
    (json) => (json as { data: SurahDetail }).data,
  );
}

/**
 * Normalize Arabic text for search
 */
function normalizeArabic(text: string): string {
  return text
    .replace(/[أإآا]/g, 'ا')
    .replace(/[ةه]/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .replace(/\s+/g, '')
    .trim();
}

export async function searchSurahs(query: string): Promise<Surah[]> {
  const surahs = await fetchSurahs();
  const normalizedQuery = normalizeArabic(query);
  const simpleQuery = query.toLowerCase().trim();

  return surahs.filter(s => {
    const normalizedName = normalizeArabic(s.name);
    if (normalizedName.includes(normalizedQuery)) return true;
    if (s.englishName.toLowerCase().includes(simpleQuery)) return true;
    if (s.englishNameTranslation.toLowerCase().includes(simpleQuery)) return true;
    if (String(s.number).includes(simpleQuery)) return true;
    return false;
  });
}

export async function searchAyahs(query: string): Promise<{ surah: Surah; ayahs: { number: number; text: string; surahNumber: number }[] }> {
  const response = await fetch(`${BASE_URL}/search/${encodeURIComponent(query)}/all/quran-uthmani`);
  if (!response.ok) throw new Error('فشل في البحث');
  const data = await response.json();
  return data.data;
}
