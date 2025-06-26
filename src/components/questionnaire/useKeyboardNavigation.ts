import { useState, KeyboardEvent } from 'react';

type UseKeyboardNavigationProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
};

export function useKeyboardNavigation<T>({
  items,
  onSelect,
}: UseKeyboardNavigationProps<T>) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      onSelect(items[focusedIndex]);
    }
  };

  const resetFocus = () => setFocusedIndex(-1);

  return {
    focusedIndex,
    handleKeyDown,
    resetFocus,
  };
}
