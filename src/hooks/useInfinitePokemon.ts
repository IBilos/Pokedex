import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemonDetails, fetchPokemonSpecies } from '../api/pokeApi';
import { getFilteredPokemonList } from '../utils/getFilteredPokemonList';
import type { PokemonDetails } from '../types/pokemon';
import type { PokemonFilters } from '../types/props';
import { filterByStats } from '../utils/filterByStats';
import { sortPokemonList } from '../utils/sortPokemonList';

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

      const sortedList = sortPokemonList(filteredList, sortCriteria, pokemonToGeneration);

      let results: PokemonDetails[] = [];
      let offset = pageParam;

      while (results.length < limit && offset < sortedList.length) {
        const slice = sortedList.slice(offset, offset + limit);

        const detailedWithNulls = await Promise.all(
          slice.map(async (p) => {
            try {
              const cached = queryClient.getQueryData<PokemonDetails>(['pokemon', p.name]);
              if (cached) return cached;

              const data = await fetchPokemonDetails(p.name);
              let generation = pokemonToGeneration?.get(p.name);

              // Probably a variant of pokemon, fetch species to find base form
              if (!generation) {
                let speciesData = speciesCache.get(p.name);
                if (!speciesData) {
                  speciesData = await fetchPokemonSpecies(p.name);
                  speciesCache.set(p.name, speciesData);
                }

                const defaultVariety = speciesData.varieties.find((v: any) => v.is_default);
                const baseSpeciesName = defaultVariety
                  ? defaultVariety.pokemon.name
                  : speciesData.name;

                generation = pokemonToGeneration?.get(baseSpeciesName) ?? 0;
              }

              const dataWithGeneration = { ...data, generation };
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
