import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../api/pokeApi';
import { getFilteredPokemonList } from '../utils/getFilteredPokemonList';
import type { PokemonDetails } from '../types/pokemon';
import type { PokemonFilters } from '../types/props';
import { filterByStats } from '../utils/filterByStats';

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
    enabled = true,
  } = filters;

  const queryClient = useQueryClient();

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
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const filteredList = await getFilteredPokemonList(
        { types, generations, abilities, search },
        queryClient,
      );

      if (!filteredList.length) return { results: [], nextOffset: undefined };

      let results: PokemonDetails[] = [];
      let offset = pageParam;

      while (results.length < limit && offset < filteredList.length) {
        const slice = filteredList.slice(offset, offset + limit);

        const detailedWithNulls = await Promise.all(
          slice.map(async (p) => {
            try {
              const cached = queryClient.getQueryData<PokemonDetails>(['pokemon', p.name]);
              if (cached) return cached;

              const data = await fetchPokemonDetails(p.name);
              queryClient.setQueryData(['pokemon', p.name], data);
              return data;
            } catch (err) {
              console.log(err);
              return null;
            }
          }),
        );

        let detailed: PokemonDetails[] = detailedWithNulls.filter(
          (p): p is PokemonDetails => p !== null,
        );

        // Filter by stats
        const filtered = filterByStats(detailed, { attackRange, defenseRange, speedRange });
        results.push(...filtered);

        offset += limit;
      }

      const nextOffset = offset < filteredList.length ? offset : undefined;

      return { results, nextOffset };
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
