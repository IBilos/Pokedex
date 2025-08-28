import { useQuery } from '@tanstack/react-query';
import { fetchPokemonGenerations } from '../api/pokeApi';

export function usePokemonGenerations() {
  return useQuery({
    queryKey: ['pokemonGenerations'],
    queryFn: fetchPokemonGenerations,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
