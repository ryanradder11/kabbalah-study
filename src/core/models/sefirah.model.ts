export type SefiraId =
  | 'keter' | 'chokhmah' | 'binah' | 'daat'
  | 'chesed' | 'gevurah' | 'tiferet'
  | 'netzach' | 'hod' | 'yesod' | 'malkuth';

export type Pillar = 'middle' | 'mercy' | 'severity';

export interface Sefirah {
  id: SefiraId;
  number: number;
  hebrewName: string;
  transliteration: string;
  meaning: string;
  divineName: string;
  divineNameTranslit: string;
  archangel: string;
  archangelHebrew: string;
  angelicOrder: string;
  angelicOrderHebrew: string;
  mundaneChakra: string;
  virtue: string;
  vice: string | null;
  spiritualExperience: string;
  symbols: string[];
  color: {
    atziluth: string;
    beriah: string;
    yetzirah: string;
    assiah: string;
  };
  pillar: Pillar;
  isHidden: boolean;
  description: string;
  svgX: number;
  svgY: number;
}
