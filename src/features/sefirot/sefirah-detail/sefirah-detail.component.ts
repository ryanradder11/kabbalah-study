import { Component, inject, computed, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { SefirotService } from '../../../core/services/sefirot.service';
import { PathsService } from '../../../core/services/paths.service';
import { BookmarksService } from '../../../core/services/bookmarks.service';
import { SefiraId } from '../../../core/models/sefirah.model';

@Component({
  selector: 'app-sefirah-detail',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatChipsModule],
  templateUrl: './sefirah-detail.component.html',
  styleUrls: ['./sefirah-detail.component.scss'],
})
export class SefirahDetailComponent {
  @Input() set id(val: string) { this._id = val as SefiraId; }

  private _id: SefiraId = 'keter';
  private readonly sefirotSvc = inject(SefirotService);
  private readonly pathsSvc = inject(PathsService);
  private readonly bookmarksSvc = inject(BookmarksService);

  readonly sefirah = computed(() => this.sefirotSvc.getById(this._id));
  readonly relatedPaths = computed(() => this._id ? this.pathsSvc.getBySefirah(this._id) : []);
  readonly prevNext = computed(() => this.sefirotSvc.getPrevNext(this._id));
  readonly isBookmarked = computed(() => this.bookmarksSvc.isBookmarked('sefirah', this._id));

  toggleBookmark(): void {
    this.bookmarksSvc.toggle('sefirah', this._id);
  }
}
