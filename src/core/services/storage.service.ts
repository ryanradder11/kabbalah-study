import { Injectable, signal } from '@angular/core';
import {
  KabbalahStorageSchema,
  STORAGE_KEY,
  DEFAULT_STORAGE,
  APP_VERSION,
} from '../models/storage.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly _store = signal<KabbalahStorageSchema>(this.loadFromStorage());

  readonly store = this._store.asReadonly();

  private loadFromStorage(): KabbalahStorageSchema {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STORAGE };
      const parsed: KabbalahStorageSchema = JSON.parse(raw);
      return this.migrate(parsed);
    } catch {
      return { ...DEFAULT_STORAGE };
    }
  }

  private migrate(schema: KabbalahStorageSchema): KabbalahStorageSchema {
    if (schema.appVersion === APP_VERSION) return schema;
    // Future migrations go here
    return { ...DEFAULT_STORAGE, ...schema, appVersion: APP_VERSION };
  }

  update(updater: (current: KabbalahStorageSchema) => KabbalahStorageSchema): void {
    const updated = updater(this._store());
    this._store.set(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('localStorage write failed:', e);
    }
  }

  reset(): void {
    this._store.set({ ...DEFAULT_STORAGE });
    localStorage.removeItem(STORAGE_KEY);
  }

  getStorageSizeBytes(): number {
    try {
      return new Blob([localStorage.getItem(STORAGE_KEY) ?? '']).size;
    } catch {
      return 0;
    }
  }
}
