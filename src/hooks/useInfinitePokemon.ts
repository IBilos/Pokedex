import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../api/pokeApi';
import { usePokemonList } from './usePokemonList';
import type { PokemonDetails } from '../types/pokemon';

export function useInfinitePokemon(limit = 50, search = '') {
  const queryClient = useQueryClient();
  const { data: masterList, isLoading: isListLoading } = usePokemonList();

  const filteredList =
    masterList?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())) || [];

  const query = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite', limit, search],
    queryFn: async ({ pageParam = 0 }) => {
      if (!filteredList.length) return { results: [], nextOffset: undefined };

      const slice = filteredList.slice(pageParam, pageParam + limit);

      const detailed: PokemonDetails[] = await Promise.all(
        slice.map(async (p) => {
          const cached = queryClient.getQueryData<PokemonDetails>(['pokemon', p.name]);
          if (cached) return cached;

          const data = fetchPokemonDetails(p.name);
          queryClient.setQueryData(['pokemon', p.name], data);
          return data;
        }),
      );

      const nextOffset = pageParam + limit < filteredList.length ? pageParam + limit : undefined;

      return { results: detailed, nextOffset };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!masterList,
  });

  return {
    pokemons: query.data?.pages.flatMap((p) => p.results) || [],
    isLoading: isListLoading || query.isLoading,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
}
