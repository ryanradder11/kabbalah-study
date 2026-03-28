import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GematriaService } from '../../../core/services/gematria.service';
import { GematriaResult } from '../../../core/models/gematria.model';

interface SofitKey { letter: string; value: number; name: string; }

@Component({
  selector: 'app-gematria-calculator',
  standalone: true,
  imports: [FormsModule, RouterLink, TitleCasePipe, MatCardModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatButtonModule, MatIconModule],
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

  readonly keyboardRows = [
    this.letters.slice(0, 10),
    this.letters.slice(10, 20),
    this.letters.slice(20),
  ];

  readonly sofitKeys: SofitKey[] = this.letters
    .filter(l => l.finalFormLetter)
    .map(l => ({ letter: l.finalFormLetter!, value: l.finalFormValue!, name: l.name }));

  onInput(value: string): void {
    this.inputText.set(value);
  }

  insertLetter(letter: string): void {
    this.inputText.update(v => v + letter);
  }

  deleteLast(): void {
    this.inputText.update(v => {
      if (!v.length) return v;
      return [...v].slice(0, -1).join('');
    });
  }

  clearInput(): void {
    this.inputText.set('');
  }
}
