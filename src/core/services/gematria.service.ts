import { Injectable } from '@angular/core';
import { GematriaResult } from '../models/gematria.model';
import { SefiraId } from '../models/sefirah.model';
import { SEFIROT } from '../../data/sefirot.data';
import { PATHS } from '../../data/paths.data';
import { LETTER_VALUE_MAP, HEBREW_LETTERS } from '../../data/gematria.data';

const HEBREW_RANGE = /[\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB4F]/;

@Injectable({ providedIn: 'root' })
export class GematriaService {
  readonly letters = HEBREW_LETTERS;

  calculate(input: string): GematriaResult {
    const trimmed = input.trim();
    const breakdown: Array<{ letter: string; value: number }> = [];
    let total = 0;

    for (const char of trimmed) {
      if (HEBREW_RANGE.test(char)) {
        const val = LETTER_VALUE_MAP[char] ?? 0;
        if (val > 0) {
          breakdown.push({ letter: char, value: val });
          total += val;
        }
      }
    }

    return {
      inputText: trimmed,
      totalValue: total,
      letterBreakdown: breakdown,
      matchingSefirot: this.findMatchingSefirot(total),
      matchingPaths: this.findMatchingPaths(total),
    };
  }

  private findMatchingSefirot(value: number): SefiraId[] {
    return SEFIROT
      .filter(s => s.number === value)
      .map(s => s.id);
  }

  private findMatchingPaths(value: number): number[] {
    return PATHS
      .filter(p => p.numericalValue === value || (p.finalFormValue && p.finalFormValue === value))
      .map(p => p.id);
  }

  getLetterValue(letter: string): number {
    return LETTER_VALUE_MAP[letter] ?? 0;
  }
}
