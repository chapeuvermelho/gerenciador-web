import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

export function usePersistentState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (!isBrowser) return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Erro ao salvar no localStorage", error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
