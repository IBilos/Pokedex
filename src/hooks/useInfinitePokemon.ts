import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../api/pokeApi';
import { usePokemonList } from './usePokemonList';

export function useInfinitePokemon(limit = 50) {
  const { data: masterList, isLoading: isListLoading } = usePokemonList();

  const query = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite', limit],
    queryFn: async ({ pageParam = 0 }) => {
      if (!masterList) return { results: [], nextOffset: undefined };

      const slice = masterList.slice(pageParam, pageParam + limit);

      const detailed = await Promise.all(slice.map((p) => fetchPokemonDetails(p.name)));

      const nextOffset = pageParam + limit < masterList.length ? pageParam + limit : undefined;

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
