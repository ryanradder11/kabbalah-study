import { SefiraId } from './sefirah.model';

export type LetterType = 'mother' | 'double' | 'simple';

export interface KabbalahPath {
  id: number;
  hebrewLetter: string;
  letterName: string;
  letterNameHebrew: string;
  letterMeaning: string;
  letterType: LetterType;
  numericalValue: number;
  finalFormValue?: number;
  associatedElement?: 'fire' | 'water' | 'air' | 'earth';
  associatedPlanet?: string;
  associatedZodiac?: string;
  fromSefirah: SefiraId;
  toSefirah: SefiraId;
  color: string;
  description: string;
}
