import type { PokemonListItem } from '../types/pokemon';
import type { SortCriteria } from '../types/pokemon';

export function sortPokemonList(
  list: PokemonListItem[],
  criteria: SortCriteria | null,
): PokemonListItem[] {
  if (!criteria) return list;

  const sorted = [...list];
  const [key, order] = criteria.split('-');

  const direction = order === 'asc' ? 1 : -1;

  switch (key) {
    case 'name':
      return sorted.sort((a, b) => direction * a.name.localeCompare(b.name));
    default:
      return list;
  }
}
