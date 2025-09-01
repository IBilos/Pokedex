import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getFilteredPokemonList } from '../utils/getFilteredPokemonList';
import type { PokemonFilters } from '../types/props';
import { sortPokemonNameList } from '../utils/sortPokemonNameList';
import { fetchAllData } from '../utils/fetchAllData';
import { fetchPartialData } from '../utils/fetchPartialData';

function isStatOrGenerationSort(sortCriteria: string | null) {
  return (
    sortCriteria?.startsWith('attack') ||
    sortCriteria?.startsWith('defense') ||
    sortCriteria?.startsWith('speed') ||
    sortCriteria?.startsWith('total') ||
    sortCriteria?.startsWith('generation')
  );
}

export function useInfinitePokemon(filters: PokemonFilters) {
  const {
    limit = 50,
    search = '',
    types = [],
    generations = [],
    abilities = [],
    attackRange,
    defenseRange,
    speedRange,
    sortCriteria,
    pokemonToGeneration,
    enabled = true,
  } = filters;

  const queryClient = useQueryClient();
  const speciesCache = new Map<string, any>();

  const query = useInfiniteQuery({
    queryKey: [
      'pokemons',
      'infinite',
      limit,
      search,
      types,
      generations,
      abilities,
      attackRange,
      defenseRange,
      speedRange,
      sortCriteria,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const filteredList = await getFilteredPokemonList(
        { types, generations, abilities, search },
        queryClient,
      );

      if (!filteredList.length) return { results: [], nextOffset: undefined };

      if (isStatOrGenerationSort(sortCriteria)) {
        return fetchAllData(
          filteredList,
          pageParam,
          limit,
          sortCriteria,
          queryClient,
          pokemonToGeneration,
          speciesCache,
        );
      }

      const sortedList = sortPokemonNameList(filteredList, sortCriteria);

      return fetchPartialData(
        sortedList,
        pageParam,
        limit,
        queryClient,
        pokemonToGeneration,
        speciesCache,
        attackRange,
        defenseRange,
        speedRange,
      );
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: enabled,
  });

  return {
    pokemons: query.data?.pages.flatMap((p) => p.results) || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
}
