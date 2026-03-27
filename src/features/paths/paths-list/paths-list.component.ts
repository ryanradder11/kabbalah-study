import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PathsService } from '../../../core/services/paths.service';

@Component({
  selector: 'app-paths-list',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, MatCardModule, MatChipsModule],
  templateUrl: './paths-list.component.html',
  styleUrls: ['./paths-list.component.scss'],
})
export class PathsListComponent {
  private readonly pathsSvc = inject(PathsService);
  readonly paths = this.pathsSvc.paths;

  getTypeColor(t: string): string {
    return t === 'mother' ? '#d97706' : t === 'double' ? '#3730a3' : '#666';
  }
}
