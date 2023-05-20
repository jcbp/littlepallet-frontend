import { useState } from "react";

export const useHighlightItem = () => {
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(
    null
  );
  const [highlightColor, setHighlightColor] = useState<
    "green" | "red" | undefined
  >("green");

  const highlightItem = (
    itemId: string,
    color: "green" | "red",
    onHighlightEndCallback?: (itemId: string) => void
  ) => {
    setHighlightedItemId(itemId);
    setHighlightColor(color);

    setTimeout(() => {
      setHighlightedItemId(null);
      setHighlightColor(undefined);
      if (onHighlightEndCallback) {
        onHighlightEndCallback(itemId);
      }
    }, 800);
  };

  return {
    highlightedItemId,
    highlightColor,
    highlightItem,
  };
};
