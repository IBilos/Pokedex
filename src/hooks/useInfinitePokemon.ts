import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getFilteredPokemonList } from '../utils/getFilteredPokemonList';
import type { PokemonDetails } from '../types/pokemon';
import type { PokemonFilters } from '../types/props';
import { filterByStats } from '../utils/filterByStats';
import { sortPokemonNameList } from '../utils/sortPokemonNameList';
import { sortPokemonListDetailed } from '../utils/sortPokemonListDetailed';
import { fetchPokemonWithVariant } from '../utils/fetchPokemonWithVariant';

const BATCH_SIZE = import.meta.env.VITE_BATCH_SIZE
  ? parseInt(import.meta.env.VITE_BATCH_SIZE, 10)
  : 50;

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

      //Stat || generation sort grana
      if (isStatOrGenerationSort(sortCriteria)) {
        console.log('Stat sort detected, fetching all details in batches...');
        const allDetails: PokemonDetails[] = [];
        for (let i = 0; i < filteredList.length; i += BATCH_SIZE) {
          const batch = filteredList.slice(i, i + BATCH_SIZE);

          const detailedBatch = await Promise.all(
            batch.map(async (p) => {
              try {
                const cached = queryClient.getQueryData<PokemonDetails>(['pokemon', p.name]);
                if (cached) return cached;

                const dataWithGeneration = await fetchPokemonWithVariant(
                  p.name,
                  pokemonToGeneration,
                  speciesCache,
                );

                queryClient.setQueryData(['pokemon', p.name], dataWithGeneration);
                return dataWithGeneration;
              } catch (err) {
                console.error('Error fetching Pokémon:', p.name, err);
                return null;
              }
            }),
          );
          allDetails.push(...detailedBatch.filter((p): p is PokemonDetails => p !== null));
        }
        const sorted = sortPokemonListDetailed(allDetails, sortCriteria);
        const results = sorted.slice(pageParam, pageParam + limit);
        const nextOffset = pageParam + limit < sorted.length ? pageParam + limit : undefined;

        return { results, nextOffset };
      }

      const sortedList = sortPokemonNameList(filteredList, sortCriteria);

      let results: PokemonDetails[] = [];
      let offset = pageParam;

      while (results.length < limit && offset < sortedList.length) {
        const slice = sortedList.slice(offset, offset + limit);

        const detailedWithNulls = await Promise.all(
          slice.map(async (p) => {
            try {
              const cached = queryClient.getQueryData<PokemonDetails>(['pokemon', p.name]);
              if (cached) return cached;

              const dataWithGeneration = await fetchPokemonWithVariant(
                p.name,
                pokemonToGeneration,
                speciesCache,
              );

              queryClient.setQueryData(['pokemon', p.name], dataWithGeneration);
              return dataWithGeneration;
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
