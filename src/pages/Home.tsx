import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.scss'; // import your SCSS file

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Pokemon = {
  name: string;
  url: string;
  image: string;
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true);

        // Get list of 20 Pokémon
        const res = await axios.get(`${API_BASE_URL}/pokemon?limit=20`);
        const results = res.data.results;

        // For each Pokémon, fetch its details to get image
        const detailedPokemons = await Promise.all(
          results.map(async (pokemon: { name: string; url: string }) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              url: pokemon.url,
              image: details.data.sprites.front_default,
            };
          }),
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  return (
    <div className="home">
      <h1 className="title">Pokédex</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-grid">
          {pokemons.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
