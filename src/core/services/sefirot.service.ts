import { Injectable, computed, signal } from '@angular/core';
import { Sefirah, SefiraId, Pillar } from '../models/sefirah.model';
import { SEFIROT } from '../../data/sefirot.data';

@Injectable({ providedIn: 'root' })
export class SefirotService {
  private readonly _sefirot = signal<Sefirah[]>(SEFIROT);

  readonly sefirot = this._sefirot.asReadonly();

  readonly visibleSefirot = computed(() =>
    this._sefirot().filter(s => !s.isHidden)
  );

  getById(id: SefiraId): Sefirah | undefined {
    return this._sefirot().find(s => s.id === id);
  }

  getByPillar(pillar: Pillar): Sefirah[] {
    return this._sefirot().filter(s => s.pillar === pillar && !s.isHidden);
  }

  getByNumber(n: number): Sefirah | undefined {
    return this._sefirot().find(s => s.number === n);
  }

  getPrevNext(id: SefiraId): { prev: Sefirah | null; next: Sefirah | null } {
    const all = this._sefirot().filter(s => !s.isHidden).sort((a, b) => a.number - b.number);
    const idx = all.findIndex(s => s.id === id);
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    };
  }
}
