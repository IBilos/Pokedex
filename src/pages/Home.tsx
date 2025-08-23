import { useEffect, useRef, useState } from 'react';
import './Home.scss';
import { useInfinitePokemon } from '../hooks/usePokemon';
import { useVirtualizer } from '@tanstack/react-virtual';

export default function Home() {
  const { pokemons, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfinitePokemon(20);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(2);

  //Added for updating of columns on resize
  useEffect(() => {
    const updateColumns = () => {
      const width = parentRef.current?.clientWidth || window.innerWidth;
      if (width < 640) setColumns(2);
      else if (width < 1024) setColumns(3);
      else if (width < 1280) setColumns(4);
      else setColumns(5);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const rows = Math.ceil(pokemons.length / columns);
  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
    overscan: 5,
  });

  //Infinite scroll detection
  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;
    const handleScroll = () => {
      const scrollBotom = parent.scrollTop + parent.clientHeight;
      if (scrollBotom >= parent.scrollHeight - 500 && hasNextPage) {
        fetchNextPage();
      }
    };

    parent.addEventListener('scroll', handleScroll);
    return () => parent.removeEventListener('scroll', handleScroll);
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
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gap: '1.5rem',
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

        {isLoading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading...</p>}
      </div>
    </div>
  );
}
