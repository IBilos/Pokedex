import { useEffect, useState } from 'react';
import './Home.scss';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import Header from '../components/pokemon/header/Header';
import Sidebar from '../components/pokemon/sidebar/Sidebar';
import PokemonGrid from '../components/pokemon/grid/PokemonGrid';
import toast from 'react-hot-toast';
import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { usePokemonGenerations } from '../hooks/usePokemonGenerations';
import { usePokemonAbilities } from '../hooks/usePokemonAbilities';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);

  const { data: types, isLoading: isTypesLoading } = usePokemonTypes();
  const { data: generations, isLoading: isGenerationsLoading } = usePokemonGenerations();
  const { data: abilities, isLoading: isAbilitiesLoading } = usePokemonAbilities();

  const { pokemons, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfinitePokemon({
    limit: 20,
    search,
    types: selectedTypes,
    generations: selectedGenerations,
    abilities: selectedAbilities,
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
          selectedTypes={selectedTypes}
          onTypeChange={setSelectedTypes}
          generations={generations}
          isGenerationsLoading={isGenerationsLoading}
          selectedGenerations={selectedGenerations}
          onGenerationChange={setSelectedGenerations}
          abilities={abilities}
          isAbilitiesLoading={isAbilitiesLoading}
          selectedAbilities={selectedAbilities}
          onAbilityChange={setSelectedAbilities}
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
