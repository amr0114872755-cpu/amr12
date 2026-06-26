
import { useState, useEffect } from 'react';
import { fetchSurahs, fetchSurahText } from '@/services/quranApi';
import type { Surah, SurahDetail } from '@/types/quran';

export function useSurahs() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchSurahs()
      .then(data => {
        if (!cancelled) {
          setSurahs(data);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message || 'حدث خطأ في تحميل البيانات');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { surahs, loading, error };
}

export function useSurahDetail(surahNumber: number | null) {
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!surahNumber) return;
    let cancelled = false;
    setLoading(true);
    setSurah(null);
    fetchSurahText(surahNumber)
      .then(data => {
        if (!cancelled) {
          setSurah(data);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message || 'حدث خطأ في تحميل السورة');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [surahNumber]);

  return { surah, loading, error };
}
