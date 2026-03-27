import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { FlashcardService, FlashcardMode, FlashcardItem } from '../../../core/services/flashcard.service';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatChipsModule],
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
})
export class FlashcardsComponent implements OnInit {
  private readonly flashcardSvc = inject(FlashcardService);

  readonly mode = signal<FlashcardMode>('all');
  readonly deck = signal<FlashcardItem[]>([]);
  readonly currentIndex = signal(0);
  readonly flipped = signal(false);

  readonly currentCard = computed(() => this.deck()[this.currentIndex()]);
  readonly progress = computed(() => {
    const d = this.deck();
    return d.length ? ((this.currentIndex() / d.length) * 100) : 0;
  });
  readonly knownCount = computed(() =>
    Object.values(this.flashcardSvc.progress()).reduce((a, p) => a + p.knownCount, 0)
  );

  ngOnInit(): void {
    this.startDeck();
  }

  startDeck(): void {
    this.deck.set(this.flashcardSvc.getDeck(this.mode()));
    this.currentIndex.set(0);
    this.flipped.set(false);
  }

  setMode(m: FlashcardMode): void {
    this.mode.set(m);
    this.startDeck();
  }

  flip(): void {
    this.flipped.update(v => !v);
  }

  markKnown(): void {
    const card = this.currentCard();
    if (card) {
      const id = card.type === 'sefirah' ? (card.data as any).id : String((card.data as any).id);
      this.flashcardSvc.markKnown(card.type, id);
    }
    this.next();
  }

  markUnknown(): void {
    const card = this.currentCard();
    if (card) {
      const id = card.type === 'sefirah' ? (card.data as any).id : String((card.data as any).id);
      this.flashcardSvc.markUnknown(card.type, id);
    }
    this.next();
  }

  next(): void {
    if (this.currentIndex() < this.deck().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.flipped.set(false);
    }
  }

  prev(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.flipped.set(false);
    }
  }

  getFrontText(card: FlashcardItem): string {
    return card.type === 'sefirah'
      ? (card.data as any).hebrewName
      : (card.data as any).hebrewLetter;
  }

  getBackLines(card: FlashcardItem): string[] {
    if (card.type === 'sefirah') {
      const s = card.data as any;
      return [
        `${s.transliteration} — ${s.meaning}`,
        `Divine Name: ${s.divineNameTranslit}`,
        `Archangel: ${s.archangel}`,
        `Angelic Order: ${s.angelicOrder}`,
        `Mundane Chakra: ${s.mundaneChakra}`,
        `Virtue: ${s.virtue}`,
      ];
    }
    const p = card.data as any;
    return [
      `${p.letterName} (${p.letterMeaning})`,
      `Type: ${p.letterType}`,
      `Value: ${p.numericalValue}`,
      p.associatedElement ? `Element: ${p.associatedElement}` : '',
      p.associatedPlanet ? `Planet: ${p.associatedPlanet}` : '',
      p.associatedZodiac ? `Zodiac: ${p.associatedZodiac}` : '',
      `Connects: ${p.fromSefirah} → ${p.toSefirah}`,
    ].filter(Boolean);
  }
}
