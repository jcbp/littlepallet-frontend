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

export const useList = (listId: string) => {
  const { getList, updateList } = useContext(ListContext);
  const list = getList(listId);

  const {
    loading,
    error: errorFetchingList,
    request: fetchList,
  } = useRequest<List>("GET");

  const {
    loading: savingItemField,
    error: errorSavingItemField,
    request: requestUpdateItemField,
  } = useRequest<Item>("PATCH");

  const {
    loading: addingItem,
    error: errorAddingItem,
    request: requestAddItem,
  } = useRequest<Item>("POST");

  const {
    loading: deletingItem,
    error: errorDeletingItem,
    request: requestDeleteItem,
  } = useRequest<Item>("DELETE");

  useEffect(() => {
    fetchList(apiEndpoints.getList(listId)).then((responseData) => {
      if (responseData) {
        updateList(listId, responseData);
      }
    });
  }, [listId]);

  const updateItemField = (itemId: string, fieldId: string, value: any) => {
    requestUpdateItemField(
      apiEndpoints.updateItemField(listId, itemId, fieldId),
      {
        value,
      }
    );
  };

  const addItem = async (item: ItemWithoutId = {}) => {
    const newItem = await requestAddItem(apiEndpoints.createItem(listId), item);
    if (list && newItem) {
      const updatedList = {
        ...list,
        items: [...list.items, newItem],
      };
      updateList(listId, updatedList);
    }
  };

  const removeItem = async (itemId: string) => {
    const deletedItem = await requestDeleteItem(
      apiEndpoints.deleteItem(listId, itemId)
    );
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
    list,
    loading,
    addingItem,
    savingItemField,
    deletingItem,
    error: errorFetchingList || errorSavingItemField || errorAddingItem,
    updateItemField,
    addItem,
    removeItem,
  };
};
