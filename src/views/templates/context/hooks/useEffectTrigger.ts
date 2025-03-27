import { useState, useCallback } from "react";

export const useEffectTrigger = (): [number, () => void] => {
  const [counter, setCounter] = useState(0);
  const updateCounter = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  return [counter, updateCounter];
};
