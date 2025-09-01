import { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useColumns } from '../../../hooks/useColumns';
import type { PokemonDetails, PokemonGridProps } from '../../../types/pokemon';
import './PokemonGrid.scss';
import PokemonCard from '../card/PokemonCard';
import PokemonModal from '../modal/PokemonModal';
import EmptyState from '../../ui/emptyState/EmptyState';
import Loader from '../../ui/loader/Loader';

export default function PokemonGrid({
  pokemons,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: PokemonGridProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const columns = useColumns(parentRef);

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  const getRowHeight = useCallback(() => {
    if (window.innerWidth >= 1280) return 280 + 44;
    if (window.innerWidth >= 1024) return 280 + 44;
    if (window.innerWidth >= 640) return 280 + 14;
    return 200 + 24;
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(pokemons.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: getRowHeight,
    overscan: 5,
  });

  useEffect(() => {
    const handleResize = () => rowVirtualizer.measure();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [rowVirtualizer]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { root: parentRef.current, rootMargin: '200px' },
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <main className="pokemon-grid-container" ref={parentRef}>
      <div style={{ height: rowVirtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const start = virtualRow.index * columns;
          const end = start + columns;
          const rowPokemons = pokemons.slice(start, end);

          return (
            <div
              key={virtualRow.index}
              className="pokemon-grid"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                display: 'grid',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowPokemons.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  onClick={(pokemon) => setSelectedPokemon(pokemon)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div ref={loadMoreRef} style={{ height: '1px' }} />

      {!isLoading && pokemons.length === 0 && (
        <EmptyState message="No Pokémon found." imageSrc="/assets/sad-pikachu.png" />
      )}

      {isLoading && <Loader />}

      <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
    </main>
  );
}
