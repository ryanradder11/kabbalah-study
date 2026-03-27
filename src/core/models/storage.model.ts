export type EntityType = 'sefirah' | 'path' | 'qliphah';

export interface Note {
  id: string;
  entityType: EntityType;
  entityId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  entityType: EntityType;
  entityId: string;
  bookmarkedAt: string;
}

export interface FlashcardProgress {
  entityType: 'sefirah' | 'path';
  entityId: string;
  knownCount: number;
  unknownCount: number;
  lastSeen: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  entityType: EntityType;
  entityId: string;
  attribute: string;
}

export interface QuizSession {
  id: string;
  startedAt: string;
  completedAt: string | null;
  questions: QuizQuestion[];
  answers: number[];
  score: number;
  total: number;
}

export interface KabbalahStorageSchema {
  notes: Note[];
  bookmarks: Bookmark[];
  flashcardProgress: Record<string, FlashcardProgress>;
  quizHistory: QuizSession[];
  appVersion: string;
}

export const STORAGE_KEY = 'kabbalah_app_v1';
export const APP_VERSION = '1.0.0';

export const DEFAULT_STORAGE: KabbalahStorageSchema = {
  notes: [],
  bookmarks: [],
  flashcardProgress: {},
  quizHistory: [],
  appVersion: APP_VERSION,
};
