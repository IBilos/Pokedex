// Map for Pokémon forms where species differs from variant
const FORM_EDGE_CASES: Record<string, string> = {
  // Deoxys forms
  'deoxys-normal': 'deoxys',
  'deoxys-attack': 'deoxys',
  'deoxys-defense': 'deoxys',
  'deoxys-speed': 'deoxys',

  // Giratina
  'giratina-altered': 'giratina',
  'giratina-origin': 'giratina',

  // Shaymin
  'shaymin-land': 'shaymin',
  'shaymin-sky': 'shaymin',

  // Meloetta
  'meloetta-aria': 'meloetta',
  'meloetta-pirouette': 'meloetta',

  // Tornadus / Thundurus / Landorus
  'tornadus-incarnate': 'tornadus',
  'tornadus-therian': 'tornadus',
  'thundurus-incarnate': 'thundurus',
  'thundurus-therian': 'thundurus',
  'landorus-incarnate': 'landorus',
  'landorus-therian': 'landorus',

  // Keldeo
  'keldeo-ordinary': 'keldeo',
  'keldeo-resolute': 'keldeo',

  // Aegislash
  'aegislash-shield': 'aegislash',
  'aegislash-blade': 'aegislash',

  // Wormadam
  'wormadam-plant': 'wormadam',
  'wormadam-sandy': 'wormadam',
  'wormadam-trash': 'wormadam',

  // Regional variants (Alola/Galar)
  'raichu-alola': 'raichu',
  'exeggutor-alola': 'exeggutor',
  'marowak-alola': 'marowak',
  'rattata-alola': 'rattata',
  'raticate-alola': 'raticate',
  'sandshrew-alola': 'sandshrew',
  'sandslash-alola': 'sandslash',
  'diglett-alola': 'diglett',
  'dugtrio-alola': 'dugtrio',
  'meowth-galar': 'meowth',
  'ponyta-galar': 'ponyta',
  'rapidash-galar': 'rapidash',
  'zigzagoon-galar': 'zigzagoon',
  'linoone-galar': 'linoone',
  'darumaka-galar': 'darumaka',
  'darmanitan-galar': 'darmanitan',
  'yamask-galar': 'yamask',
  'stunfisk-galar': 'stunfisk',

  // Totem forms / event masks
  'kommo-o-totem': 'kommo-o',
  'ogerpon-wellspring-mask': 'ogerpon',
  'ogerpon-hearthflame-mask': 'ogerpon',
  'ogerpon-cornerstone-mask': 'ogerpon',
  'terapagos-terastal': 'terapagos',
  'terapagos-stellar': 'terapagos',

  // Necrozma / Urshifu forms
  'necrozma-dusk-mane': 'necrozma',
  'necrozma-dawn-wings': 'necrozma',
  'urshifu-single-strike': 'urshifu',
  'urshifu-rapid-strike': 'urshifu',
};

// Pokémon whose species name includes a hyphen
const HYPHENATED_NAMES = new Set([
  'mr-mime',
  'mr-rime',
  'type-null',
  'jangmo-o',
  'hakamo-o',
  'kommo-o',
]);

export function resolveSpeciesName(name: string): string {
  const lower = name.toLowerCase();

  if (FORM_EDGE_CASES[lower]) return FORM_EDGE_CASES[lower];

  for (const species of HYPHENATED_NAMES) {
    if (lower.startsWith(species)) return species;
  }

  return lower.split('-')[0];
}
