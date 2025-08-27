import type { PokemonListItem, PokemonDetails } from '../../types/pokemon';

export const mockPokemonList: PokemonListItem[] = [
  { name: 'mew', url: 'https://pokeapi.co/api/v2/pokemon/mew' },
  { name: 'mewtwo', url: 'https://pokeapi.co/api/v2/pokemon/mewtwo' },
];

export const mockPokemonDetails: Record<string, PokemonDetails> = {
  mew: {
    id: 151,
    name: 'mew',
    height: 4,
    weight: 40,
    sprites: { front_default: 'mew.png' },
    types: [{ type: { name: 'psychic', url: '' } }],
    stats: [
      { base_stat: 100, stat: { name: 'hp' } },
      { base_stat: 100, stat: { name: 'attack' } },
    ],
  },
  mewtwo: {
    id: 150,
    name: 'mewtwo',
    height: 20,
    weight: 1220,
    sprites: { front_default: 'mewtwo.png' },
    types: [{ type: { name: 'psychic', url: '' } }],
    stats: [
      { base_stat: 120, stat: { name: 'hp' } },
      { base_stat: 120, stat: { name: 'attack' } },
    ],
  },
};
