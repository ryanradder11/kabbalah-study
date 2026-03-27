import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { FlashcardProgress } from '../models/storage.model';
import { Sefirah } from '../models/sefirah.model';
import { KabbalahPath } from '../models/path.model';
import { SEFIROT } from '../../data/sefirot.data';
import { PATHS } from '../../data/paths.data';

export type FlashcardMode = 'sefirot' | 'paths' | 'all';
export type FlashcardItem = { type: 'sefirah'; data: Sefirah } | { type: 'path'; data: KabbalahPath };

@Injectable({ providedIn: 'root' })
export class FlashcardService {
  private readonly storage = inject(StorageService);

  readonly progress = computed(() => this.storage.store().flashcardProgress);

  getDeck(mode: FlashcardMode): FlashcardItem[] {
    let items: FlashcardItem[] = [];
    if (mode === 'sefirot' || mode === 'all') {
      items = [...items, ...SEFIROT.filter(s => !s.isHidden).map(s => ({ type: 'sefirah' as const, data: s }))];
    }
    if (mode === 'paths' || mode === 'all') {
      items = [...items, ...PATHS.map(p => ({ type: 'path' as const, data: p }))];
    }
    return this.shuffle(items);
  }

  getProgress(entityType: 'sefirah' | 'path', entityId: string): FlashcardProgress | undefined {
    return this.progress()[`${entityType}:${entityId}`];
  }

  markKnown(entityType: 'sefirah' | 'path', entityId: string): void {
    this.updateProgress(entityType, entityId, p => ({
      ...p,
      knownCount: p.knownCount + 1,
      lastSeen: new Date().toISOString(),
    }));
  }

  markUnknown(entityType: 'sefirah' | 'path', entityId: string): void {
    this.updateProgress(entityType, entityId, p => ({
      ...p,
      unknownCount: p.unknownCount + 1,
      lastSeen: new Date().toISOString(),
    }));
  }

  resetProgress(): void {
    this.storage.update(store => ({ ...store, flashcardProgress: {} }));
  }

  private updateProgress(
    entityType: 'sefirah' | 'path',
    entityId: string,
    updater: (p: FlashcardProgress) => FlashcardProgress
  ): void {
    const key = `${entityType}:${entityId}`;
    this.storage.update(store => {
      const existing = store.flashcardProgress[key] ?? {
        entityType,
        entityId,
        knownCount: 0,
        unknownCount: 0,
        lastSeen: new Date().toISOString(),
      };
      return {
        ...store,
        flashcardProgress: { ...store.flashcardProgress, [key]: updater(existing) },
      };
    });
  }

  private shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
