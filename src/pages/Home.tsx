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
import { STAT_LIMITS } from '../utils/constants';
import type { SortCriteria } from '../types/pokemon';
import { usePokemonToGenerationMap } from '../hooks/usePokemonToGenerationMap';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);

  const { data: types, isLoading: isTypesLoading } = usePokemonTypes();
  const { data: generations, isLoading: isGenerationsLoading } = usePokemonGenerations();
  const { data: abilities, isLoading: isAbilitiesLoading } = usePokemonAbilities();
  const { data: pokemonToGeneration, isLoading: isGenMapLoading } = usePokemonToGenerationMap();

  const [attackRange, setAttackRange] = useState<[number, number]>([
    STAT_LIMITS.attack[0],
    STAT_LIMITS.attack[1],
  ]);
  const [defenseRange, setDefenseRange] = useState<[number, number]>([
    STAT_LIMITS.defense[0],
    STAT_LIMITS.defense[1],
  ]);
  const [speedRange, setSpeedRange] = useState<[number, number]>([
    STAT_LIMITS.speed[0],
    STAT_LIMITS.speed[1],
  ]);

  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(null);

  const { pokemons, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfinitePokemon({
    limit: 20,
    search,
    types: selectedTypes,
    generations: selectedGenerations,
    abilities: selectedAbilities,
    attackRange,
    defenseRange,
    speedRange,
    sortCriteria,
    pokemonToGeneration,
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
          attackRange={attackRange}
          defenseRange={defenseRange}
          speedRange={speedRange}
          onAttackChange={setAttackRange}
          onDefenseChange={setDefenseRange}
          onSpeedChange={setSpeedRange}
          sortCriteria={sortCriteria}
          onSortCriteriaChange={setSortCriteria}
        />
        <PokemonGrid
          pokemons={pokemons}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isLoading || isGenMapLoading}
        />
      </div>
    </div>
  );
}
