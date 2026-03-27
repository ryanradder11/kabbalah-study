import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Note, EntityType } from '../models/storage.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly storage = inject(StorageService);

  readonly notes = computed(() => this.storage.store().notes);

  getByEntity(entityType: EntityType, entityId: string): Note[] {
    return this.notes().filter(
      n => n.entityType === entityType && n.entityId === entityId
    );
  }

  save(partial: Pick<Note, 'entityType' | 'entityId' | 'content'> & { id?: string }): void {
    const now = new Date().toISOString();
    this.storage.update(store => {
      const existing = store.notes.findIndex(n => n.id === partial.id);
      if (existing >= 0 && partial.id) {
        const updated = store.notes.map((n, i) =>
          i === existing ? { ...n, content: partial.content, updatedAt: now } : n
        );
        return { ...store, notes: updated };
      }
      const newNote: Note = {
        id: crypto.randomUUID(),
        entityType: partial.entityType,
        entityId: partial.entityId,
        content: partial.content,
        createdAt: now,
        updatedAt: now,
      };
      return { ...store, notes: [...store.notes, newNote] };
    });
  }

  delete(id: string): void {
    this.storage.update(store => ({
      ...store,
      notes: store.notes.filter(n => n.id !== id),
    }));
  }

  search(query: string): Note[] {
    const q = query.toLowerCase();
    return this.notes().filter(
      n => n.content.toLowerCase().includes(q) || n.entityId.toLowerCase().includes(q)
    );
  }
}
