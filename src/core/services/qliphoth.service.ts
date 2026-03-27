import { Injectable, signal } from '@angular/core';
import { Qliphah } from '../models/qliphah.model';
import { SefiraId } from '../models/sefirah.model';
import { QLIPHOTH } from '../../data/qliphoth.data';

@Injectable({ providedIn: 'root' })
export class QliphothService {
  private readonly _qliphoth = signal<Qliphah[]>(QLIPHOTH);

  readonly qliphoth = this._qliphoth.asReadonly();

  getById(id: string): Qliphah | undefined {
    return this._qliphoth().find(q => q.id === id);
  }

  getBySefirah(sefirahId: SefiraId): Qliphah | undefined {
    return this._qliphoth().find(q => q.correspondingSefirah === sefirahId);
  }
}
