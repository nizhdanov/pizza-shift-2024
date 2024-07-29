import { useCallback, useEffect, useRef } from 'react';

export const useDebounceCallback = <Params extends unknown[]>(
  callback: (...args: Params) => void,
  delay: number
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback(
    (...args: Params) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debounced;
};
