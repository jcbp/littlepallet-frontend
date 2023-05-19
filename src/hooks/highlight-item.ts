import { useState } from "react";

export const useHighlightItem = () => {
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(
    null
  );

  const highlightItem = (
    itemId: string,
    onHighlightEndCallback?: (itemId: string) => void
  ) => {
    setHighlightedItemId(itemId);

    setTimeout(() => {
      setHighlightedItemId(null);
      if (onHighlightEndCallback) {
        onHighlightEndCallback(itemId);
      }
    }, 1200);
  };

  return {
    highlightedItemId,
    highlightItem,
  };
};
