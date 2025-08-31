import type { PokemonListItem } from '../types/pokemon';
import type { SortCriteria } from '../types/pokemon';

export function sortPokemonNameList(
  list: PokemonListItem[],
  criteria: SortCriteria | null,
): PokemonListItem[] {
  if (!criteria) return list;

  const sorted = [...list];
  const [key, order] = criteria.split('-');
  const direction = order === 'asc' ? 1 : -1;

  switch (key) {
    case 'name':
      console.log('Sorting by name', direction);
      return sorted.sort((a, b) => direction * a.name.localeCompare(b.name));
    default:
      return list;
  }
}
