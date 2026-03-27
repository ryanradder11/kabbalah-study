import { SefiraId } from './sefirah.model';

export interface HebrewLetter {
  letter: string;
  name: string;
  transliteration: string;
  value: number;
  finalFormLetter?: string;
  finalFormValue?: number;
  ordinalValue: number;
}

export interface GematriaResult {
  inputText: string;
  totalValue: number;
  letterBreakdown: Array<{ letter: string; value: number }>;
  matchingSefirot: SefiraId[];
  matchingPaths: number[];
}
