import { useQuery } from '@tanstack/react-query';
import { fetchPokemonAbilities } from '../api/pokeApi';

export function usePokemonAbilities() {
  return useQuery({
    queryKey: ['pokemonAbilities'],
    queryFn: fetchPokemonAbilities,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
