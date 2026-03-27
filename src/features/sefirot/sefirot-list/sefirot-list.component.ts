import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { SefirotService } from '../../../core/services/sefirot.service';

@Component({
  selector: 'app-sefirot-list',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './sefirot-list.component.html',
  styleUrls: ['./sefirot-list.component.scss'],
})
export class SefirotListComponent {
  private readonly sefirotSvc = inject(SefirotService);
  readonly sefirot = this.sefirotSvc.sefirot;
}
