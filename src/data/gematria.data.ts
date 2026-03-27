import { HebrewLetter } from '../core/models/gematria.model';

export const HEBREW_LETTERS: HebrewLetter[] = [
  { letter: 'א', name: 'Aleph', transliteration: 'A / silent', value: 1, ordinalValue: 1 },
  { letter: 'ב', name: 'Bet', transliteration: 'B / V', value: 2, ordinalValue: 2 },
  { letter: 'ג', name: 'Gimel', transliteration: 'G', value: 3, ordinalValue: 3 },
  { letter: 'ד', name: 'Dalet', transliteration: 'D', value: 4, ordinalValue: 4 },
  { letter: 'ה', name: 'Heh', transliteration: 'H', value: 5, ordinalValue: 5 },
  { letter: 'ו', name: 'Vav', transliteration: 'V / O / U', value: 6, ordinalValue: 6 },
  { letter: 'ז', name: 'Zayin', transliteration: 'Z', value: 7, ordinalValue: 7 },
  { letter: 'ח', name: 'Chet', transliteration: 'Ch', value: 8, ordinalValue: 8 },
  { letter: 'ט', name: 'Tet', transliteration: 'T', value: 9, ordinalValue: 9 },
  { letter: 'י', name: 'Yod', transliteration: 'Y / I', value: 10, ordinalValue: 10 },
  { letter: 'כ', name: 'Kaph', transliteration: 'K / Kh', value: 20, finalFormLetter: 'ך', finalFormValue: 500, ordinalValue: 11 },
  { letter: 'ל', name: 'Lamed', transliteration: 'L', value: 30, ordinalValue: 12 },
  { letter: 'מ', name: 'Mem', transliteration: 'M', value: 40, finalFormLetter: 'ם', finalFormValue: 600, ordinalValue: 13 },
  { letter: 'נ', name: 'Nun', transliteration: 'N', value: 50, finalFormLetter: 'ן', finalFormValue: 700, ordinalValue: 14 },
  { letter: 'ס', name: 'Samekh', transliteration: 'S', value: 60, ordinalValue: 15 },
  { letter: 'ע', name: 'Ayin', transliteration: 'silent / Gh', value: 70, ordinalValue: 16 },
  { letter: 'פ', name: 'Peh', transliteration: 'P / F', value: 80, finalFormLetter: 'ף', finalFormValue: 800, ordinalValue: 17 },
  { letter: 'צ', name: 'Tzadi', transliteration: 'Tz', value: 90, finalFormLetter: 'ץ', finalFormValue: 900, ordinalValue: 18 },
  { letter: 'ק', name: 'Qoph', transliteration: 'Q / K', value: 100, ordinalValue: 19 },
  { letter: 'ר', name: 'Resh', transliteration: 'R', value: 200, ordinalValue: 20 },
  { letter: 'ש', name: 'Shin', transliteration: 'Sh / S', value: 300, ordinalValue: 21 },
  { letter: 'ת', name: 'Tav', transliteration: 'T / Th', value: 400, ordinalValue: 22 },
];

// Build lookup maps
export const LETTER_VALUE_MAP: Record<string, number> = {};
HEBREW_LETTERS.forEach(l => {
  LETTER_VALUE_MAP[l.letter] = l.value;
  if (l.finalFormLetter && l.finalFormValue) {
    LETTER_VALUE_MAP[l.finalFormLetter] = l.finalFormValue;
  }
});

export const NAME_TO_VALUE_MAP: Record<string, number> = {};
HEBREW_LETTERS.forEach(l => {
  NAME_TO_VALUE_MAP[l.name.toLowerCase()] = l.value;
  NAME_TO_VALUE_MAP[l.transliteration.toLowerCase().split(' / ')[0]] = l.value;
});
