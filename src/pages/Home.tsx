import { useEffect, useState } from 'react';
import './Home.scss';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import Header from '../components/pokemon/header/Header';
import Sidebar from '../components/pokemon/sidebar/Sidebar';
import PokemonGrid from '../components/pokemon/grid/PokemonGrid';
import toast from 'react-hot-toast';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { pokemons, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfinitePokemon(
    20,
    search,
  );

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || 'Something went wrong');
    }
  }, [isError, error]);

  return (
    <div className="home">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className="content">
        <Sidebar isOpen={isSidebarOpen} search={search} onSearchChange={setSearch} />
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
