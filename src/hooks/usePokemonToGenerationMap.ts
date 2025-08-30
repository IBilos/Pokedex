import { useQuery } from '@tanstack/react-query';
import { buildPokemonToGenerationMap } from '../utils/buildPokemonToGenerationMap';

export function usePokemonToGenerationMap() {
  return useQuery({
    queryKey: ['pokemonToGenerationMap'],
    queryFn: buildPokemonToGenerationMap,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
