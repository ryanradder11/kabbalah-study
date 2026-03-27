import { Component, inject, computed, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorldsService } from '../../../core/services/worlds.service';
import { WorldId } from '../../../core/models/world.model';

@Component({
  selector: 'app-world-detail',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './world-detail.component.html',
  styleUrls: ['./world-detail.component.scss'],
})
export class WorldDetailComponent {
  @Input() set id(val: string) { this._id = val as WorldId; }
  private _id: WorldId = 'atziluth';
  private readonly worldsSvc = inject(WorldsService);
  readonly world = computed(() => this.worldsSvc.getById(this._id));
}
