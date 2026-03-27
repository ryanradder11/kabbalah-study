import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../core/services/notes.service';
import { BookmarksService } from '../../core/services/bookmarks.service';
import { FlashcardService } from '../../core/services/flashcard.service';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly notes = inject(NotesService);
  private readonly bookmarks = inject(BookmarksService);
  private readonly flashcards = inject(FlashcardService);
  private readonly quiz = inject(QuizService);

  readonly noteCount = computed(() => this.notes.notes().length);
  readonly bookmarkCount = computed(() => this.bookmarks.bookmarks().length);
  readonly lastQuizScore = computed(() => {
    const h = this.quiz.history();
    if (!h.length || !h[0].completedAt) return null;
    return { score: h[0].score, total: h[0].total };
  });

  readonly quickLinks = [
    { label: 'Tree of Life', icon: 'account_tree', route: '/tree', desc: 'Interactive visualization of the Etz Chaim' },
    { label: 'Sefirot', icon: 'brightness_7', route: '/sefirot', desc: 'Explore the ten divine emanations' },
    { label: 'Gematria', icon: 'calculate', route: '/gematria', desc: 'Calculate numerical values of Hebrew words' },
    { label: 'Study', icon: 'school', route: '/study/flashcards', desc: 'Flashcards and quizzes' },
  ];
}
