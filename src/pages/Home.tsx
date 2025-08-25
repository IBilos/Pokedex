import { useEffect, useRef } from 'react';
import './Home.scss';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useColumns } from '../hooks/useColumns';

export default function Home() {
  const { pokemons, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfinitePokemon(20);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const columns = useColumns(parentRef);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(pokemons.length / 5),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: parentRef.current,
        rootMargin: '200px',
      },
    );
    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="home">
      <h1 className="title">Pokédex</h1>

      {isError && <p>{error?.message || 'Something went wrong'}</p>}

      <div className="pokemon-grid-container" ref={parentRef}>
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
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

        {/* Sentinel for infinite scroll */}
        <div ref={loadMoreRef} style={{ height: '1px' }} />

        {isLoading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading...</p>}
      </div>
    </div>
  );
}
