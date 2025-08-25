import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../api/pokeApi';
import type { PokemonListItem } from '../types/pokemon';

export function usePokemonList() {
  return useQuery<PokemonListItem[], Error>({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
