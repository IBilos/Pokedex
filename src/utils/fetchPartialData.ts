import type { useQueryClient } from '@tanstack/react-query';
import type { PokemonDetails } from '../types/pokemon';
import { fetchPokemonCached } from './fetchPokemonCached';
import { filterByStats } from './filterByStats';

export async function fetchPartialData(
  filteredList: { name: string }[],
  pageParam: number,
  limit: number,
  queryClient: ReturnType<typeof useQueryClient>,
  pokemonToGeneration: Map<string, number> | undefined,
  speciesCache: Map<string, any>,
  attackRange?: [number, number],
  defenseRange?: [number, number],
  speedRange?: [number, number],
) {
  const results: PokemonDetails[] = [];
  let offset = pageParam;

  while (results.length < limit && offset < filteredList.length) {
    const slice = filteredList.slice(offset, offset + limit);

    const detailedWithNulls = await Promise.all(
      slice.map((p) => fetchPokemonCached(p.name, queryClient, pokemonToGeneration, speciesCache)),
    );

    const detailed = detailedWithNulls.filter((p): p is PokemonDetails => p !== null);

    const filtered = filterByStats(detailed, { attackRange, defenseRange, speedRange });
    results.push(...filtered);

    offset += limit;
  }

  const nextOffset = offset < filteredList.length ? offset : undefined;

  return { results, nextOffset };
}
