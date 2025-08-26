import { useState } from 'react';
import './Home.scss';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import Header from '../components/pokemon/header/Header';
import Sidebar from '../components/pokemon/sidebar/Sidebar';
import PokemonGrid from '../components/pokemon/pokemonGrid/PokemonGrid';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pokemons, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfinitePokemon(20);

  return (
    <div className="home">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {isError && <p>{error?.message || 'Something went wrong'}</p>}

      <div className="content">
        <Sidebar isOpen={isSidebarOpen} />
        <PokemonGrid
          pokemons={pokemons}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
