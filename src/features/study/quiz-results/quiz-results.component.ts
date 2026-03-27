import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="page-content">
      <h1 class="section-title">Quiz Results</h1>
      <mat-card>
        <mat-card-content>
          <p>Quiz results will be displayed here.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class QuizResultsComponent {}
