import { useEndpoint } from "../use-endpoint";
import { Item } from "../../types/item";
import { Endpoints } from "../../endpoints";

export const useUpdateItem = (listId: string, item: Item) => {
  return useEndpoint<Item>(
    Endpoints.updateItem(listId, item._id),
    "PATCH",
    {
      requiresAuth: true,
    },
    item
  );
};

export const useUpdateItemField = (
  listId: string,
  itemId: string,
  fieldId: string,
  value: any
) => {
  return useEndpoint<Item>(
    Endpoints.updateItemField(listId, itemId, fieldId),
    "PATCH",
    {
      requiresAuth: true,
    },
    { value }
  );
};
