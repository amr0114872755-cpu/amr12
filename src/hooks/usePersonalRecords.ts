import { useMemo } from 'react';
import { useProgress } from '@/components/providers/ProgressProvider';

export interface PersonalRecords {
  bestAyahsDay: { date: string; value: number } | null;
  bestListenDay: { date: string; value: number } | null;
  bestMemoDay: { date: string; value: number } | null;
  longestStreak: number;
  totalActiveDays: number;
}

export function usePersonalRecords(): PersonalRecords {
  const { dailyWird, dailyHistory, userProgress } = useProgress();

  return useMemo(() => {
    const all = dailyWird ? [...dailyHistory, dailyWird] : dailyHistory;

    const findMax = (key: 'ayahsRead' | 'minutesListened' | 'memorizationMinutes') => {
      let best: { date: string; value: number } | null = null;
      for (const d of all) {
        const v = (d as any)[key] || 0;
        if (v > 0 && (!best || v > best.value)) best = { date: d.date, value: v };
      }
      return best;
    };

    const activeDays = all.filter(d =>
      (d.ayahsRead || 0) + (d.minutesListened || 0) + (d.memorizationMinutes || 0) > 0
    ).length;

    return {
      bestAyahsDay: findMax('ayahsRead'),
      bestListenDay: findMax('minutesListened'),
      bestMemoDay: findMax('memorizationMinutes'),
      longestStreak: userProgress.longestStreak,
      totalActiveDays: activeDays,
    };
  }, [dailyWird, dailyHistory, userProgress.longestStreak]);
}
