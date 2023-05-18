import { useEffect, useRef } from "react";
import { List } from "../types/list";
import { Item } from "../types/item";

type Subscriber = (item: Item) => void;

export const useNewItemEvent = (list: List | null) => {
  const previousItemsRef = useRef<Item[]>([]);
  const subscribersRef = useRef<Subscriber | null>(null);

  useEffect(() => {
    if (!list) return;

    const previousItems = previousItemsRef.current;
    const currentItems = list.items;

    if (currentItems.length === previousItems.length + 1) {
      const newItem = currentItems.find(
        (item) => !previousItems.includes(item)
      );
      if (newItem) {
        notifyNewItem(newItem);
      }
    }

    previousItemsRef.current = currentItems;
  }, [list]);

  const notifyNewItem = (newItem: Item) => {
    if (subscribersRef.current) {
      subscribersRef.current(newItem);
    }
  };

  const subscribeNewItemEvent = (subscriber: Subscriber) => {
    subscribersRef.current = subscriber;

    return () => {
      subscribersRef.current = null;
    };
  };

  return {
    subscribeNewItemEvent,
  };
};
