import type { useQueryClient } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonsByGeneration, fetchPokemonsByType } from '../api/pokeApi';
import type { PokemonListItem } from '../types/pokemon';

export async function getFilteredPokemonList(
  filters: { type?: string | null; generation?: string | null; search?: string },
  queryClient: ReturnType<typeof useQueryClient>,
) {
  const { type, generation, search } = filters;
  let baseList: PokemonListItem[] = [];

  const getCachedOrFetch = async (
    key: readonly unknown[],
    fetcher: () => Promise<PokemonListItem[]>,
  ) => {
    const cached = queryClient.getQueryData<PokemonListItem[]>(key);
    if (cached) return cached;
    const data = await fetcher();
    queryClient.setQueryData(key, data);
    return data;
  };

  if (type && generation) {
    const typeList = await getCachedOrFetch(['pokemon', 'type', type], () =>
      fetchPokemonsByType(type),
    );
    const generationList = await getCachedOrFetch(['pokemon', 'generation', generation], () =>
      fetchPokemonsByGeneration(generation),
    );
    baseList = typeList.filter((p) => generationList.some((g) => g.name === p.name));
  } else if (type) {
    baseList = await getCachedOrFetch(['pokemon', 'type', type], () => fetchPokemonsByType(type));
  } else if (generation) {
    baseList = await getCachedOrFetch(['pokemon', 'generation', generation], () =>
      fetchPokemonsByGeneration(generation),
    );
  } else {
    baseList = await getCachedOrFetch(['pokemon', 'list'], fetchPokemonList);
  }

  if (search) {
    baseList = baseList.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  return baseList;
}
