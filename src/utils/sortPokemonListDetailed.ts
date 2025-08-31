import type { PokemonDetails } from '../types/pokemon';
import type { SortCriteria } from '../types/pokemon';

export function sortPokemonListDetailed(
  list: PokemonDetails[],
  criteria: SortCriteria | null,
): PokemonDetails[] {
  if (!criteria) return list;

  const sorted = [...list];
  const [key, order] = criteria.split('-');
  const direction = order === 'asc' ? 1 : -1;

  switch (key) {
    case 'attack':
      return sorted.sort(
        (a, b) =>
          direction *
          ((a.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0) -
            (b.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0)),
      );

    case 'defense':
      return sorted.sort(
        (a, b) =>
          direction *
          ((a.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0) -
            (b.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0)),
      );

    case 'speed':
      return sorted.sort(
        (a, b) =>
          direction *
          ((a.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0) -
            (b.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0)),
      );

    case 'total':
      return sorted.sort(
        (a, b) =>
          direction *
          (a.stats.reduce((sum, s) => sum + s.base_stat, 0) -
            b.stats.reduce((sum, s) => sum + s.base_stat, 0)),
      );
    case 'generation':
      return sorted.sort((a, b) => direction * ((a.generation ?? 1) - (b.generation ?? 1)));
    default:
      return list;
  }
}
