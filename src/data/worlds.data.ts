import { World } from '../core/models/world.model';

export const WORLDS: World[] = [
  {
    id: 'atziluth',
    hebrewName: 'אֲצִילוּת',
    transliteration: 'Atziluth',
    meaning: 'Emanation',
    realm: 'Divine / Archetypal',
    divineAspect: 'Pure Divine Being',
    correspondingName: 'YHVH (יְהוָה)',
    description:
      'Atziluth is the highest of the Four Worlds, the World of Emanation. It is the most immediate expression of Ein Sof (the Infinite), where the divine attributes are wholly unified and undifferentiated. In Atziluth, the Sefirot are not separate qualities but aspects of pure divine consciousness. Nothing exists here that is separate from God — it is pure archetypal reality, unconditioned by form or limitation. The divine names in Atziluth represent God\'s essence at its most immediate, before any veiling or contraction.',
    sefirotExpression:
      'In Atziluth, each Sefirah manifests in its purest archetypal form as a direct emanation of divine will. The colors of the Sefirot in Atziluth (the King Scale) represent their most essential, unconditioned qualities.',
    color: '#FFD700',
    order: 1,
  },
  {
    id: 'beriah',
    hebrewName: 'בְּרִיאָה',
    transliteration: 'Beriah',
    meaning: 'Creation',
    realm: 'Archangelic / Creative',
    divineAspect: 'Divine Thought',
    correspondingName: 'YHVH Elohim (יְהוָה אֱלֹהִים)',
    description:
      "Beriah is the World of Creation, the second of the Four Worlds. It is the realm of the Archangels and the divine throne. In Beriah, the pure archetypes of Atziluth begin to take on form as distinct divine thoughts. The great Archangels — Metatron, Raziel, Tzaphkiel, and their companions — dwell here as direct expressions of divine creative intent. Beriah corresponds to the divine throne (Kisei HaKavod) described in Ezekiel's vision and in the Hekhalot literature. It is the world where creation is conceived before it takes on individual existence.",
    sefirotExpression:
      'In Beriah, the Sefirot manifest as distinct divine thoughts and creative archetypes, governed by the Archangels. The Queen Scale colors represent this level of creative differentiation.',
    color: '#4169E1',
    order: 2,
  },
  {
    id: 'yetzirah',
    hebrewName: 'יְצִירָה',
    transliteration: 'Yetzirah',
    meaning: 'Formation',
    realm: 'Angelic / Astral',
    divineAspect: 'Divine Formation',
    correspondingName: 'Elohim (אֱלֹהִים)',
    description:
      "Yetzirah is the World of Formation, the third of the Four Worlds and the realm of Angels. Here the creative impulses from Beriah are shaped and organized into patterns. Yetzirah is the astral plane — the world of dreams, symbols, and the subtle forces that animate physical existence. The Sefer Yetzirah (Book of Formation) describes how God used the twenty-two letters of the Hebrew alphabet to form this world, inscribing creation's patterns before they manifested in matter. The angelic orders that populate Yetzirah carry out the formative will of the higher worlds.",
    sefirotExpression:
      'In Yetzirah, the Sefirot manifest as dynamic patterns and forces that organize the astral world. The Emperor Scale colors represent this level of astral formation.',
    color: '#228B22',
    order: 3,
  },
  {
    id: 'assiah',
    hebrewName: 'עֲשִׂיָּה',
    transliteration: 'Assiah',
    meaning: 'Action / Making',
    realm: 'Material / Physical',
    divineAspect: 'Divine Action',
    correspondingName: 'Adonai (אֲדֹנָי)',
    description:
      'Assiah is the World of Action, the fourth and lowest of the Four Worlds — the physical universe in which we live. It is the realm where all the higher patterns, archetypes, and formations finally condense into matter and energy. Assiah includes both the physical world (Olam Ha-Gashmi) and its subtle counterpart, the realm of the Qliphoth (shells or husks) that are the refuse of higher worlds. The divine name Adonai (Lord) is used in Assiah to address God as experienced through the material world. Kabbalistic practice in Assiah involves sanctifying everyday physical actions, transforming mundane existence into divine service.',
    sefirotExpression:
      'In Assiah, the Sefirot manifest as the physical planets and elements: Keter as the Primum Mobile, Chokhmah as the Fixed Stars, and so forth down to Malkuth as Earth itself. The Empress Scale colors represent this material manifestation.',
    color: '#8B4513',
    order: 4,
  },
];
