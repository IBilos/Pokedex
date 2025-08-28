import { useQuery } from '@tanstack/react-query';
import { fetchPokemonTypes } from '../api/pokeApi';

export function usePokemonTypes() {
  return useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: fetchPokemonTypes,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
