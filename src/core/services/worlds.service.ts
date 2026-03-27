import { Injectable, signal } from '@angular/core';
import { World, WorldId } from '../models/world.model';
import { WORLDS } from '../../data/worlds.data';

@Injectable({ providedIn: 'root' })
export class WorldsService {
  private readonly _worlds = signal<World[]>([...WORLDS].sort((a, b) => a.order - b.order));

  readonly worlds = this._worlds.asReadonly();

  getById(id: WorldId): World | undefined {
    return this._worlds().find(w => w.id === id);
  }
}
