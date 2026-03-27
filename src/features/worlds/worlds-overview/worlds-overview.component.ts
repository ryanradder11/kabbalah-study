import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { WorldsService } from '../../../core/services/worlds.service';

@Component({
  selector: 'app-worlds-overview',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTabsModule],
  templateUrl: './worlds-overview.component.html',
  styleUrls: ['./worlds-overview.component.scss'],
})
export class WorldsOverviewComponent {
  private readonly worldsSvc = inject(WorldsService);
  readonly worlds = this.worldsSvc.worlds;
}
