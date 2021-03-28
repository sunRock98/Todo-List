import { useCallback } from "react";

export const useLocalStorage = <T>(key: string) => {
  const write = useCallback(
    (data: T): void => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }
    },
    [key]
  );

  const read = useCallback((): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data != null ? JSON.parse(data) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [key]);

  return { write, read };
};
