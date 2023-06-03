import { useRequest } from "../use-request";
import { List } from "../../types/list";
import { apiEndpoints } from "../../api-endpoints";
import { Item } from "../../types/item";
import { useCallback, useEffect } from "react";
import { useListDispatch, useListStore } from "../../context/list-store";
import { ActionType } from "../../reducers/list-reducer";
import { clamp, debounce } from "lodash";

type ItemWithoutId = Omit<Item, "_id">;

export const useGetList = (listId: string) => {
  const dispatch = useListDispatch();
  const { list } = useListStore();

  const {
    loading,
    error: errorFetchingList,
    request: fetchList,
  } = useRequest<List>("GET");

  useEffect(() => {
    fetchList(apiEndpoints.getList(listId)).then((responseData) => {
      if (responseData) {
        dispatch({
          type: ActionType.SetList,
          payload: responseData,
        });
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
  const dispatch = useListDispatch();
    const { list } = useListStore();

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
    dispatch({
      type: ActionType.UpdateItemField,
      payload: { itemId, fieldId, value },
    });

    const updatedItem = list!.items.find((item) => item._id === itemId);

    if (callback && updatedItem) {
      callback(updatedItem);
    }

    debouncedUpdateItemField(itemId, fieldId, value);
  };

  return {
    savingItemField,
    error: errorSavingItemField,
    updateItemField,
  };
};

export const useAddItem = (listId: string) => {
  const dispatch = useListDispatch();

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

    if (newItem) {
      dispatch({
        type: ActionType.AddItem,
        payload: newItem,
      });

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
  const dispatch = useListDispatch();

  const {
    loading: deletingItem,
    error: errorDeletingItem,
    request: requestDeleteItem,
  } = useRequest<Item>("DELETE");

  const removeItem = async (itemId: string) => {
    await requestDeleteItem(apiEndpoints.deleteItem(listId, itemId));

    dispatch({
      type: ActionType.RemoveItem,
      payload: itemId,
    });
  };

  return {
    deletingItem,
    error: errorDeletingItem,
    removeItem,
  };
};

export const useMoveItem = (listId: string) => {
  const dispatch = useListDispatch();

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
    const position = clamp(shift, 0);

    await requestMoveItem(
      apiEndpoints.moveItemAtPosition(listId, itemId, position)
    );

    dispatch({
      type: ActionType.MoveItem,
      payload: { itemId, shift },
    });

    if (callback) {
      callback();
    }
  };

  return {
    loading,
    error,
    moveItem,
  };
};
