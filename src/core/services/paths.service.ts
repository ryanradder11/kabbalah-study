import { Injectable, signal } from '@angular/core';
import { KabbalahPath } from '../models/path.model';
import { SefiraId } from '../models/sefirah.model';
import { PATHS } from '../../data/paths.data';

@Injectable({ providedIn: 'root' })
export class PathsService {
  private readonly _paths = signal<KabbalahPath[]>(PATHS);

  readonly paths = this._paths.asReadonly();

  getById(id: number): KabbalahPath | undefined {
    return this._paths().find(p => p.id === id);
  }

  getBySefirah(sefirahId: SefiraId): KabbalahPath[] {
    return this._paths().filter(
      p => p.fromSefirah === sefirahId || p.toSefirah === sefirahId
    );
  }

  getPrevNext(id: number): { prev: KabbalahPath | null; next: KabbalahPath | null } {
    const all = this._paths().sort((a, b) => a.id - b.id);
    const idx = all.findIndex(p => p.id === id);
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    };
  }
}
