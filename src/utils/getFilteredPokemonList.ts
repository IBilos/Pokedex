import type { useQueryClient } from '@tanstack/react-query';
import {
  fetchPokemonList,
  fetchPokemonsByAbility,
  fetchPokemonsByGeneration,
  fetchPokemonsByType,
} from '../api/pokeApi';
import type { PokemonListItem } from '../types/pokemon';

export async function getFilteredPokemonList(
  filters: {
    types?: string[];
    generations?: string[];
    abilities?: string[];
    search?: string;
  },
  queryClient: ReturnType<typeof useQueryClient>,
) {
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

  // If no filters applied at all, fetch full list
  if (!filters.types?.length && !filters.generations?.length && !filters.abilities?.length) {
    baseList = await getCachedOrFetch(['pokemon', 'list'], fetchPokemonList);
  }

  // 1. Types
  if (filters.types?.length) {
    const typeLists = await Promise.all(
      filters.types.map((type) =>
        getCachedOrFetch(['pokemon', 'type', type], () => fetchPokemonsByType(type)),
      ),
    );
    baseList = Array.from(new Map(typeLists.flat().map((p) => [p.name, p])).values());
  }

  // 2. Generations
  if (filters.generations?.length) {
    const generationLists = await Promise.all(
      filters.generations.map((gen) =>
        getCachedOrFetch(['pokemon', 'generation', gen], () => fetchPokemonsByGeneration(gen)),
      ),
    );
    const allGeneration = Array.from(
      new Map(generationLists.flat().map((p) => [p.name, p])).values(),
    );
    baseList = baseList.length
      ? baseList.filter((p) => allGeneration.some((g) => g.name === p.name))
      : allGeneration;
  }

  // 3. Abilities
  if (filters.abilities?.length) {
    const abilityLists = await Promise.all(
      filters.abilities.map((ability) =>
        getCachedOrFetch(['pokemon', 'ability', ability], () => fetchPokemonsByAbility(ability)),
      ),
    );
    const allAbilities = Array.from(new Map(abilityLists.flat().map((p) => [p.name, p])).values());
    baseList = baseList.length
      ? baseList.filter((p) => allAbilities.some((a) => a.name === p.name))
      : allAbilities;
  }

  // 4. Search
  if (filters.search) {
    baseList = baseList.filter((p) => p.name.toLowerCase().includes(filters.search!.toLowerCase()));
  }

  return baseList;
}
