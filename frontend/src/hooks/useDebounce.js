// frontend/src/hooks/useDebounce.js
import { useState, useEffect } from "react";

// 🪝 Custom Hook: Delays updating a value until a timer passes
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 1. Set a timer to update the value after 'delay' ms
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. If the user types again *before* the timer finishes,
    //    this cleanup runs and cancels the previous timer.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}