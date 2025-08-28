import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemonDetails, fetchPokemonsByType } from '../api/pokeApi';
import type { PokemonDetails } from '../types/pokemon';

export function useInfinitePokemonByType(type: string | null, limit = 50) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ['pokemons', 'byType', type, limit],
    queryFn: async ({ pageParam = 0 }) => {
      if (!type) return { results: [], nextOffset: undefined };

      const fullList = await fetchPokemonsByType(type);
      const slice = fullList.slice(pageParam, pageParam + limit);

      const detailed: PokemonDetails[] = await Promise.all(
        slice.map(async (p) => {
          const cached = queryClient.getQueryData<PokemonDetails>(['pokemon', p.name]);
          if (cached) return cached;

          const data = await fetchPokemonDetails(p.name);
          queryClient.setQueryData(['pokemon', p.name], data);
          return data;
        }),
      );

      const nextOffset = pageParam + limit < fullList.length ? pageParam + limit : undefined;

      return { results: detailed, nextOffset };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    enabled: !!type,
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
