import { useEffect, useState } from 'react';
import './Home.scss';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import Header from '../components/pokemon/header/Header';
import Sidebar from '../components/pokemon/sidebar/Sidebar';
import PokemonGrid from '../components/pokemon/grid/PokemonGrid';
import toast from 'react-hot-toast';
import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { usePokemonGenerations } from '../hooks/usePokemonGenerations';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [generation, setGeneration] = useState<string | null>(null);

  const { data: types, isLoading: isTypesLoading } = usePokemonTypes();

  const { data: generations, isLoading: isGenerationsLoading } = usePokemonGenerations();

  const { pokemons, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfinitePokemon({
    limit: 20,
    search,
    type,
    generation,
  });

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
        <Sidebar
          isOpen={isSidebarOpen}
          search={search}
          onSearchChange={setSearch}
          types={types}
          isTypesLoading={isTypesLoading}
          selectedType={type}
          onTypeChange={setType}
          generations={generations}
          isGenerationsLoading={isGenerationsLoading}
          selectedGeneration={generation}
          onGenerationChange={setGeneration}
        />
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
