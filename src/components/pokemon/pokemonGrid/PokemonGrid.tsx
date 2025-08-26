import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useColumns } from '../../../hooks/useColumns';
import type { PokemonGridProps } from '../../../types/pokemon';
import './PokemonGrid.scss';

export default function PokemonGrid({
  pokemons,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: PokemonGridProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const columns = useColumns(parentRef);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(pokemons.length / 5),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

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
                <div key={p.id} className="pokemon-card">
                  <img src={p.sprites.front_default} alt={p.name} />
                  <p>{p.name}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div ref={loadMoreRef} style={{ height: '1px' }} />
      {isLoading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading...</p>}
    </main>
  );
}
