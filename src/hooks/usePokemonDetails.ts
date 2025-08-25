import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../api/pokeApi';
import type { PokemonDetails } from '../types/pokemon';

export function usePokemonDetails(name: string) {
  return useQuery<PokemonDetails, Error>({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonDetails(name),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!name,
  });
}
