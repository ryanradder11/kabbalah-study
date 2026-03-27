import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BookmarksService } from '../../../core/services/bookmarks.service';
import { SefirotService } from '../../../core/services/sefirot.service';
import { PathsService } from '../../../core/services/paths.service';
import { QliphothService } from '../../../core/services/qliphoth.service';

@Component({
  selector: 'app-bookmarks-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
})
export class BookmarksListComponent {
  private readonly bookmarksSvc = inject(BookmarksService);
  private readonly sefirotSvc = inject(SefirotService);
  private readonly pathsSvc = inject(PathsService);
  private readonly qliphothSvc = inject(QliphothService);

  readonly sefirahBookmarks = computed(() =>
    this.bookmarksSvc.getByType('sefirah').map(b => ({
      bookmark: b,
      data: this.sefirotSvc.getById(b.entityId as any),
      route: ['/sefirot', b.entityId],
    })).filter(x => x.data)
  );

  readonly pathBookmarks = computed(() =>
    this.bookmarksSvc.getByType('path').map(b => ({
      bookmark: b,
      data: this.pathsSvc.getById(Number(b.entityId)),
      route: ['/paths', b.entityId],
    })).filter(x => x.data)
  );

  readonly qliphahBookmarks = computed(() =>
    this.bookmarksSvc.getByType('qliphah').map(b => ({
      bookmark: b,
      data: this.qliphothSvc.getById(b.entityId),
      route: ['/qliphoth', b.entityId],
    })).filter(x => x.data)
  );

  removeBookmark(type: 'sefirah' | 'path' | 'qliphah', id: string): void {
    this.bookmarksSvc.toggle(type, id);
  }
}
