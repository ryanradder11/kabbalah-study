import { Component, inject, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../core/services/quiz.service';
import { QuizSession } from '../../../core/models/storage.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatButtonModule, MatProgressBarModule, MatFormFieldModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  readonly quizSvc = inject(QuizService);

  readonly questionCount = signal(10);
  readonly topics = signal<('sefirot' | 'paths')[]>(['sefirot', 'paths']);
  readonly session = signal<QuizSession | null>(null);
  readonly currentIndex = signal(0);
  readonly selectedAnswer = signal<number | null>(null);
  readonly answered = signal(false);
  readonly completed = signal(false);

  readonly currentQuestion = computed(() => {
    const s = this.session();
    if (!s) return null;
    return s.questions[this.currentIndex()];
  });

  readonly progress = computed(() => {
    const s = this.session();
    if (!s || !s.total) return 0;
    return (this.currentIndex() / s.total) * 100;
  });

  startQuiz(): void {
    const s = this.quizSvc.generateSession(this.questionCount(), this.topics());
    this.session.set(s);
    this.currentIndex.set(0);
    this.selectedAnswer.set(null);
    this.answered.set(false);
    this.completed.set(false);
  }

  selectAnswer(idx: number): void {
    if (this.answered()) return;
    this.selectedAnswer.set(idx);
    this.answered.set(true);
    const s = this.session();
    if (s) {
      this.quizSvc.submitAnswer(s.id, this.currentIndex(), idx);
    }
  }

  next(): void {
    const s = this.session();
    if (!s) return;
    if (this.currentIndex() >= s.questions.length - 1) {
      this.quizSvc.completeSession(s.id);
      this.completed.set(true);
    } else {
      this.currentIndex.update(i => i + 1);
      this.selectedAnswer.set(null);
      this.answered.set(false);
    }
  }

  getButtonClass(idx: number): string {
    if (!this.answered()) return '';
    const q = this.currentQuestion();
    if (!q) return '';
    if (idx === q.correctIndex) return 'correct';
    if (idx === this.selectedAnswer() && idx !== q.correctIndex) return 'wrong';
    return '';
  }

  getScore(): number {
    const s = this.session();
    if (!s) return 0;
    return s.questions.reduce((acc, q, i) => acc + (s.answers[i] === q.correctIndex ? 1 : 0), 0);
  }
}
