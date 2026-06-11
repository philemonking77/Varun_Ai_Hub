import { useState, useCallback } from 'react';

export function useHistory<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [index, setIndex] = useState(0);

  const state = history[index];

  const push = useCallback((newState: T) => {
    setHistory((prev) => [...prev.slice(0, index + 1), newState]);
    setIndex((prev) => prev + 1);
  }, [index]);

  const undo = useCallback(() => {
    setIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const redo = useCallback(() => {
    setIndex((prev) => Math.min(history.length - 1, prev + 1));
  }, [history.length]);

  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  return { state, push, undo, redo, canUndo, canRedo };
}
