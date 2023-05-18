import { useState } from "react";

export const useHighlightItem = () => {
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(
    null
  );

  const setHighlightedItem = (itemId: string) => {
    setHighlightedItemId(itemId);

    setTimeout(() => {
      setHighlightedItemId(null);
    }, 2000);
  };

  return {
    highlightedItemId,
    setHighlightedItem,
  };
};
