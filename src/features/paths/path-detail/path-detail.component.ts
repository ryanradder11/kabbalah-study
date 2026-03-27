import { Component, inject, computed, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { PathsService } from '../../../core/services/paths.service';
import { BookmarksService } from '../../../core/services/bookmarks.service';

@Component({
  selector: 'app-path-detail',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatChipsModule],
  templateUrl: './path-detail.component.html',
  styleUrls: ['./path-detail.component.scss'],
})
export class PathDetailComponent {
  @Input() set id(val: string) { this._id = Number(val); }
  private _id = 11;
  private readonly pathsSvc = inject(PathsService);
  private readonly bookmarksSvc = inject(BookmarksService);

  readonly path = computed(() => this.pathsSvc.getById(this._id));
  readonly prevNext = computed(() => this.pathsSvc.getPrevNext(this._id));
  readonly isBookmarked = computed(() => this.bookmarksSvc.isBookmarked('path', String(this._id)));

  toggleBookmark(): void { this.bookmarksSvc.toggle('path', String(this._id)); }
}
