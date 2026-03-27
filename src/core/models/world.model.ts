export type WorldId = 'atziluth' | 'beriah' | 'yetzirah' | 'assiah';

export interface World {
  id: WorldId;
  hebrewName: string;
  transliteration: string;
  meaning: string;
  realm: string;
  divineAspect: string;
  correspondingName: string;
  description: string;
  sefirotExpression: string;
  color: string;
  order: 1 | 2 | 3 | 4;
}
