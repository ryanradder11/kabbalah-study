import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Bookmark, EntityType } from '../models/storage.model';

@Injectable({ providedIn: 'root' })
export class BookmarksService {
  private readonly storage = inject(StorageService);

  readonly bookmarks = computed(() => this.storage.store().bookmarks);

  isBookmarked(entityType: EntityType, entityId: string): boolean {
    return this.bookmarks().some(
      b => b.entityType === entityType && b.entityId === entityId
    );
  }

  toggle(entityType: EntityType, entityId: string): void {
    this.storage.update(store => {
      const exists = store.bookmarks.some(
        b => b.entityType === entityType && b.entityId === entityId
      );
      if (exists) {
        return {
          ...store,
          bookmarks: store.bookmarks.filter(
            b => !(b.entityType === entityType && b.entityId === entityId)
          ),
        };
      }
      const newBookmark: Bookmark = {
        entityType,
        entityId,
        bookmarkedAt: new Date().toISOString(),
      };
      return { ...store, bookmarks: [...store.bookmarks, newBookmark] };
    });
  }

  getByType(entityType: EntityType): Bookmark[] {
    return this.bookmarks().filter(b => b.entityType === entityType);
  }
}
