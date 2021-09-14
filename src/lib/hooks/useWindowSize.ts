import React from 'react';
import { ISize } from '../interfaces';

export function useWindowSize(): ISize {
  const [windowSize, setWindowSize] = React.useState<ISize>({
    width: undefined,
  });
  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
