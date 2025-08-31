import type { PokemonDetails } from '../types/pokemon';
import { fetchPokemonDetails, fetchPokemonSpecies } from '../api/pokeApi';
import { resolveSpeciesName } from '../types/pokeApiHelpers';
export async function fetchPokemonWithVariant(
  name: string,
  pokemonToGeneration?: Map<string, number>,
  speciesCache?: Map<string, any>,
): Promise<PokemonDetails> {
  const data = await fetchPokemonDetails(name);

  let generation = pokemonToGeneration?.get(name);

  if (!generation && speciesCache) {
    const speciesName = resolveSpeciesName(name);

    let speciesData = speciesCache.get(speciesName);
    if (!speciesData) {
      speciesData = await fetchPokemonSpecies(speciesName);
      speciesCache.set(speciesName, speciesData);
    }

    const defaultVariety = speciesData.varieties.find((v: any) => v.is_default);
    const resolvedName = defaultVariety ? defaultVariety.pokemon.name : speciesData.name;

    const speciesGeneration = Number(speciesData.generation.url.match(/\/(\d+)\/$/)?.[1]) ?? 1;
    generation = pokemonToGeneration?.get(resolvedName) ?? speciesGeneration;
  }

  return { ...data, generation };
}
