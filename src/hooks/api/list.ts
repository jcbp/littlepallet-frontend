import { useRequest } from "../use-request";
import { ListSummary } from "../../types/list-summary";
import { List } from "../../types/list";
import { apiEndpoints } from "../../api-endpoints";
import { Item } from "../../types/item";
import { useContext, useEffect } from "react";
import { ListContext } from "../../context/list-context-provider";

type ItemWithoutId = Omit<Item, "_id">;

export const useGetLists = () => {
  return useRequest<ListSummary[]>(
    "GET",
    {
      requiresAuth: true,
    },
    apiEndpoints.getLists()
  );
};

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
  const {
    loading: savingItemField,
    error: errorSavingItemField,
    request: requestUpdateItemField,
  } = useRequest<Item>("PATCH");

  const updateItemField = (itemId: string, fieldId: string, value: any) => {
    requestUpdateItemField(
      apiEndpoints.updateItemField(listId, itemId, fieldId),
      {
        value,
      }
    );
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

  const addItem = async (item: ItemWithoutId = {}) => {
    const newItem = await requestAddItem(apiEndpoints.createItem(listId), item);
    const list = getList(listId);

    if (list && newItem) {
      const updatedList = {
        ...list,
        items: [...list.items, newItem],
      };
      updateList(listId, updatedList);
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
