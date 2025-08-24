import { useState, useLayoutEffect, type RefObject } from 'react';

export function useColumns(ref: RefObject<HTMLDivElement | null>) {
  const [columns, setColumns] = useState(5);

  useLayoutEffect(() => {
    function update() {
      const width = ref.current?.offsetWidth || window.innerWidth;
      if (width < 640) setColumns(2);
      else if (width < 1024) setColumns(3);
      else if (width < 1280) setColumns(4);
      else setColumns(5);
    }

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [ref]);

  return columns;
}
