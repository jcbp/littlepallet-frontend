import { useRequest } from "../use-request";
import { List } from "../../types/list";
import { apiEndpoints } from "../../api-endpoints";
import { Item } from "../../types/item";
import { useCallback, useContext, useEffect } from "react";
import { ListContext } from "../../context/list-context-provider";
import { clamp, debounce } from "lodash";

type ItemWithoutId = Omit<Item, "_id">;

export const useGetList = (listId: string) => {
  const { getList, updateList } = useContext(ListContext);
  const list = getList(listId);

  const {
    loading,
    error: errorFetchingList,
    request: fetchList,
  } = useRequest<List>("GET");

  useEffect(() => {
    fetchList(apiEndpoints.getList(listId)).then((responseData) => {
      if (responseData) {
        updateList(listId, responseData);
      }
    });
  }, [listId]);

  return {
    list,
    loading,
    error: errorFetchingList,
  };
};

export const useUpdateItemField = (listId: string) => {
  const { getList, updateList } = useContext(ListContext);

  const {
    loading: savingItemField,
    error: errorSavingItemField,
    request: requestUpdateItemField,
  } = useRequest<Item>("PATCH");

  const debouncedUpdateItemField = useCallback(
    debounce(async (itemId: string, fieldId: string, value: any) => {
      await requestUpdateItemField(
        apiEndpoints.updateItemField(listId, itemId, fieldId),
        {
          value,
        }
      );
    }, 700),
    [listId, requestUpdateItemField]
  );

  const updateItemField = async (
    itemId: string,
    fieldId: string,
    value: any,
    callback?: (item: Item) => void
  ) => {
    const list = getList(listId);
    const updatedList = { ...list! };
    const itemIndex = updatedList.items.findIndex(
      (item) => item._id === itemId
    );
    const item = { ...updatedList.items[itemIndex] };
    item[fieldId] = value;
    updatedList.items[itemIndex] = item;
    if (callback) {
      callback(item);
    }
    updateList(listId, updatedList);
    debouncedUpdateItemField(itemId, fieldId, value);
  };

  return {
    savingItemField,
    error: errorSavingItemField,
    updateItemField,
  };
};

export const useAddItem = (listId: string) => {
  const { getList, updateList } = useContext(ListContext);

  const {
    loading: addingItem,
    error: errorAddingItem,
    request: requestAddItem,
  } = useRequest<Item>("POST");

  const addItem = async (
    item: ItemWithoutId = {},
    callback?: (newItem: Item) => void
  ) => {
    const newItem = await requestAddItem(apiEndpoints.createItem(listId), item);
    const list = getList(listId);

    if (list && newItem) {
      const updatedList = {
        ...list,
        items: [...list.items, newItem],
      };
      updateList(listId, updatedList);
      if (callback) {
        callback(newItem);
      }
    }
  };

  return {
    addingItem,
    error: errorAddingItem,
    addItem,
  };
};

export const useRemoveItem = (listId: string) => {
  const { getList, updateList } = useContext(ListContext);

  const {
    loading: deletingItem,
    error: errorDeletingItem,
    request: requestDeleteItem,
  } = useRequest<Item>("DELETE");

  const removeItem = async (itemId: string) => {
    const deletedItem = await requestDeleteItem(
      apiEndpoints.deleteItem(listId, itemId)
    );
    const list = getList(listId);

    if (list && deletedItem) {
      const updatedItems = list.items.filter(
        (item) => item._id !== deletedItem._id
      );
      const updatedList = {
        ...list,
        items: updatedItems,
      };
      updateList(listId, updatedList);
    }
  };

  return {
    deletingItem,
    error: errorDeletingItem,
    removeItem,
  };
};

export const useMoveItem = (listId: string) => {
  const { getList, updateList } = useContext(ListContext);

  const {
    loading,
    error,
    request: requestMoveItem,
  } = useRequest<Item>("PATCH");

  const moveItem = async (
    itemId: string,
    shift: number,
    callback?: () => void
  ) => {
    const list = getList(listId);
    if (list) {
      const currentIndex = list.items.findIndex((item) => item._id == itemId);
      const maxIndex = list.items.length - 1;
      const position = clamp(currentIndex + shift, 0, maxIndex);

      await requestMoveItem(
        apiEndpoints.moveItemAtPosition(listId, itemId, position)
      );

      const updatedList = { ...list };
      const item = updatedList.items.splice(currentIndex, 1).pop();
      if (item) {
        updatedList.items.splice(position, 0, item);
        updateList(listId, updatedList);
        if (callback) {
          callback();
        }
      }
    }
  };

  return {
    loading,
    error,
    moveItem,
  };
};
