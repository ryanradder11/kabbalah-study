import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotesService } from '../../../core/services/notes.service';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe, TitleCasePipe, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent {
  readonly notesSvc = inject(NotesService);
  readonly searchQuery = signal('');
  readonly filteredNotes = computed(() => {
    const q = this.searchQuery();
    return q ? this.notesSvc.search(q) : [...this.notesSvc.notes()].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  });

  deleteNote(id: string): void {
    this.notesSvc.delete(id);
  }

  getEntityRoute(note: { entityType: string; entityId: string }): string[] {
    return [`/${note.entityType === 'sefirah' ? 'sefirot' : note.entityType === 'path' ? 'paths' : 'qliphoth'}`, note.entityId];
  }
}
