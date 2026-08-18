import { useEffect, useState } from "react";

/**
 * Delays updating the returned value until `value` has stopped changing
 * for `delayMs`. Used so the country list doesn't re-filter on every
 * single keystroke while typing in the search box.
 */
export function useDebouncedValue(value, delayMs = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
