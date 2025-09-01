import type { useQueryClient } from '@tanstack/react-query';
import type { PokemonDetails, SortCriteria } from '../types/pokemon';
import { fetchPokemonCached } from './fetchPokemonCached';
import { sortPokemonListDetailed } from './sortPokemonListDetailed';

const BATCH_SIZE = import.meta.env.VITE_BATCH_SIZE
  ? parseInt(import.meta.env.VITE_BATCH_SIZE, 10)
  : 50;

export async function fetchAllData(
  filteredList: { name: string }[],
  pageParam: number,
  limit: number,
  sortCriteria: SortCriteria,
  queryClient: ReturnType<typeof useQueryClient>,
  pokemonToGeneration: Map<string, number> | undefined,
  speciesCache: Map<string, any>,
) {
  const allDetails: PokemonDetails[] = [];

  for (let i = 0; i < filteredList.length; i += BATCH_SIZE) {
    const batch = filteredList.slice(i, i + BATCH_SIZE);
    const detailedBatch = await Promise.all(
      batch.map((p) => fetchPokemonCached(p.name, queryClient, pokemonToGeneration, speciesCache)),
    );
    allDetails.push(...detailedBatch.filter((p): p is PokemonDetails => p !== null));
  }

  const sorted = sortPokemonListDetailed(allDetails, sortCriteria);
  const results = sorted.slice(pageParam, pageParam + limit);
  const nextOffset = pageParam + limit < sorted.length ? pageParam + limit : undefined;

  return { results, nextOffset };
}
