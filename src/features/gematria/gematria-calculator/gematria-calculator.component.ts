import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { GematriaService } from '../../../core/services/gematria.service';
import { GematriaResult } from '../../../core/models/gematria.model';

@Component({
  selector: 'app-gematria-calculator',
  standalone: true,
  imports: [FormsModule, RouterLink, TitleCasePipe, MatCardModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatButtonModule],
  templateUrl: './gematria-calculator.component.html',
  styleUrls: ['./gematria-calculator.component.scss'],
})
export class GematriaCalculatorComponent {
  private readonly gematriaSvc = inject(GematriaService);
  readonly letters = this.gematriaSvc.letters;
  readonly inputText = signal('');
  readonly result = computed<GematriaResult | null>(() => {
    const t = this.inputText();
    if (!t.trim()) return null;
    return this.gematriaSvc.calculate(t);
  });

  onInput(value: string): void {
    this.inputText.set(value);
  }
}
