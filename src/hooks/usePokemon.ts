import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonDetails } from '../api/pokeApi';

export function useInfinitePokemon(limit = 50) {
  const fetchPokemons = async ({ pageParam = 0 }) => {
    const list = await fetchPokemonList(limit, pageParam);
    const detailed = await Promise.all(list.map((p) => fetchPokemonDetails(p.name)));
    return { results: detailed, nextOffset: pageParam + limit };
  };

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', limit],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage) => {
      return lastPage.results.length < limit ? undefined : lastPage.nextOffset;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
  return {
    pokemons: data?.pages.flatMap((page) => page.results) || [],
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  };
}
