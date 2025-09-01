import type { useQueryClient } from '@tanstack/react-query';
import type { PokemonDetails } from '../types/pokemon';
import { fetchPokemonWithVariant } from './fetchPokemonWithVariant';

export async function fetchPokemonCached(
  name: string,
  queryClient: ReturnType<typeof useQueryClient>,
  pokemonToGeneration: Map<string, number> | undefined,
  speciesCache: Map<string, any>,
): Promise<PokemonDetails | null> {
  try {
    const cached = queryClient.getQueryData<PokemonDetails>(['pokemon', name]);
    if (cached) return cached;

    const data = await fetchPokemonWithVariant(name, pokemonToGeneration, speciesCache);
    queryClient.setQueryData(['pokemon', name], data);
    return data;
  } catch (err) {
    console.error('Error fetching Pokémon:', name, err);
    return null;
  }
}
