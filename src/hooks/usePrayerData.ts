import { useEffect, useState } from 'react';

export type PrayerKey = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
export type PrayerTimesMap = Record<PrayerKey, string>;

export type PrayerData = {
  times: PrayerTimesMap | null;
  loading: boolean;
  error: string | null;
  city: string;
  hijri: string;
  gregorian: string;
  next: { key: PrayerKey; name: string; time: string; remainingMs: number } | null;
  nowTick: number;
};

const PRAYER_LABELS: Record<PrayerKey, string> = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

function todayHijri(): string {
  try {
    const fmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' });
    return fmt.format(new Date());
  } catch { return ''; }
}
function todayGregorian(): string {
  return new Intl.DateTimeFormat('ar', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
}

function parseTime(t: string): { h: number; m: number } | null {
  const m = t?.match(/^(\d{1,2}):(\d{1,2})/);
  if (!m) return null;
  return { h: parseInt(m[1], 10), m: parseInt(m[2], 10) };
}

function computeNext(times: PrayerTimesMap): PrayerData['next'] {
  const now = new Date();
  const order: PrayerKey[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  for (const key of order) {
    const p = parseTime(times[key]);
    if (!p) continue;
    const d = new Date(now);
    d.setHours(p.h, p.m, 0, 0);
    if (d.getTime() > now.getTime()) {
      return { key, name: PRAYER_LABELS[key], time: times[key], remainingMs: d.getTime() - now.getTime() };
    }
  }
  // After Isha: next is tomorrow's Fajr
  const fajr = parseTime(times.Fajr);
  if (fajr) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    d.setHours(fajr.h, fajr.m, 0, 0);
    return { key: 'Fajr', name: PRAYER_LABELS.Fajr, time: times.Fajr, remainingMs: d.getTime() - now.getTime() };
  }
  return null;
}

export function usePrayerData(): PrayerData {
  const [times, setTimes] = useState<PrayerTimesMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        let lat = 30.0444;
        let lon = 31.2357; // Cairo fallback
        const cached = localStorage.getItem('fajr:loc') || localStorage.getItem('prayer-now:loc');
        if (cached) {
          const c = JSON.parse(cached);
          lat = c.lat; lon = c.lon; setCity(c.city || '');
        }
        if (!cached && navigator.geolocation) {
          await new Promise<void>((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => { lat = pos.coords.latitude; lon = pos.coords.longitude; resolve(); },
              () => resolve(),
              { timeout: 5000 }
            );
          });
        }
        const date = new Date();
        const dd = `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
        const res = await fetch(`https://api.aladhan.com/v1/timings/${dd}?latitude=${lat}&longitude=${lon}&method=5`);
        const json = await res.json();
        if (cancelled) return;
        const t = json?.data?.timings;
        if (!t) throw new Error('no timings');
        const m: PrayerTimesMap = {
          Fajr: t.Fajr, Sunrise: t.Sunrise, Dhuhr: t.Dhuhr, Asr: t.Asr, Maghrib: t.Maghrib, Isha: t.Isha,
        };
        setTimes(m);
        if (!cached) {
          try {
            const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ar`);
            const d = await r.json();
            const a = d?.address || {};
            const c = [a.city || a.town || a.village || a.county || '', a.state || a.country || ''].filter(Boolean).join('، ');
            setCity(c);
            localStorage.setItem('fajr:loc', JSON.stringify({ lat, lon, city: c }));
          } catch { /* ignore */ }
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return {
    times,
    loading,
    error,
    city: city || 'مصر، محافظة القاهرة',
    hijri: todayHijri(),
    gregorian: todayGregorian(),
    next: times ? computeNext(times) : null,
    nowTick: tick,
  };
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

export function to12hArabic(t?: string): string {
  if (!t || !t.includes(':')) return '--:--';
  const p = parseTime(t);
  if (!p) return '--:--';
  let h = p.h;
  const period = h >= 12 ? 'م' : 'ص';
  h = h % 12; if (h === 0) h = 12;
  return `${h}:${String(p.m).padStart(2,'0')} ${period}`;
}
