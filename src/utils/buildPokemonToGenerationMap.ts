import { fetchPokemonGenerations, fetchPokemonsByGeneration } from '../api/pokeApi';

function getGenerationNumberFromUrl(url: string): number {
  // Extracts the number from the end of the URL, e.g., "https://pokeapi.co/api/v2/generation/2/" => 2
  const match = url.match(/\/generation\/(\d+)\//);
  return match ? Number(match[1]) : 0;
}

export async function buildPokemonToGenerationMap() {
  const generationData = await fetchPokemonGenerations();
  const map = new Map<string, number>();

  await Promise.all(
    generationData.map(async (gen) => {
      const genNumber = getGenerationNumberFromUrl(gen.url);
      const pokemons = await fetchPokemonsByGeneration(gen.name);
      pokemons.forEach((pokemon) => {
        map.set(pokemon.name, genNumber);
      });
    }),
  );

  return map;
}
