export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  identifier: string;
  language: string;
  englishName: string;
}

export interface AudioState {
  currentSurah: Surah | null;
  currentReciter: Reciter;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  timestamp: number;
}

export interface FavoriteSurah {
  number: number;
  name: string;
  numberOfAyahs: number;
  revelationType: string;
  addedAt: number;
}

// Memorization System Types
export interface MemorizationSession {
  id: string;
  surahNumber: number;
  surahName: string;
  startAyah: number;
  endAyah: number;
  mode: 'hide' | 'blur' | 'word-by-word' | 'listen-repeat';
  hiddenAyahs: number[];
  repetitions: number;
  completedAt: number;
  accuracy?: number;
  duration: number; // in seconds
}

// Surah Memorization Status
export type SurahStatus = 'not-started' | 'in-progress' | 'memorized' | 'needs-review' | 'completed';

export interface SurahMemorization {
  surahNumber: number;
  surahName: string;
  status: SurahStatus;
  progress: number; // 0-100 percentage
  startedAt?: number;
  completedAt?: number;
  lastReviewedAt?: number;
  reviewCount: number;
  notes?: string;
}

export interface MemorizationProgress {
  surahNumber: number;
  surahName: string;
  totalAyahs: number;
  memorizedAyahs: number[];
  lastRevision: number;
  revisionCount: number;
  strength: 'weak' | 'medium' | 'strong';
  nextRevision: number;
  status?: SurahStatus;
  progress?: number;
}

export interface RevisionSchedule {
  id: string;
  date: string;
  surahs: {
    surahNumber: number;
    surahName: string;
    pages: number;
    completed: boolean;
  }[];
  completed: boolean;
}

export interface DailyWird {
  date: string;
  pagesRead: number;
  ayahsRead: number;
  minutesListened: number;
  memorizationMinutes: number;
  streak: number;
}

export interface DailyGoals {
  pagesRead: number;
  ayahsRead: number;
  minutesListened: number;
  memorizationMinutes: number;
}

export interface UserProgress {
  totalAyahsMemorized: number;
  totalSurahsCompleted: number;
  totalMinutesListened: number;
  totalMinutesRead: number;
  currentStreak: number;
  longestStreak: number;
  points: number;
  level: number;
  badges: string[];
  lastActiveDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'ayahs' | 'surahs' | 'streak' | 'minutes' | 'sessions';
  unlockedAt?: number;
}

export interface RecitationResult {
  ayahNumber: number;
  spokenText: string;
  correctText: string;
  accuracy: number;
  mistakes: {
    word: string;
    correct: string;
    position: number;
  }[];
  missing: string[];
  score: number;
}

export type PlayMode = 'normal' | 'repeat-ayah' | 'repeat-range' | 'listen-repeat';
