import { useEffect, useState } from 'react';

export const useDebouncedInput = (initialValue: string, time: number = 300) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(currentValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(currentValue), time);

    return () => {
      clearTimeout(timer);
    };
  }, [currentValue, time]);

  return { currentValue, debouncedValue, setCurrentValue } as const;
};
