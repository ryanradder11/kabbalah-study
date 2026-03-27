import { SefiraId } from './sefirah.model';

export interface Qliphah {
  id: string;
  correspondingSefirah: SefiraId;
  hebrewName: string;
  transliteration: string;
  meaning: string;
  rulingDemon: string;
  rulingDemonHebrew: string;
  description: string;
  svgX: number;
  svgY: number;
}
