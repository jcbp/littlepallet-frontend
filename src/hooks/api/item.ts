import { useEndpoint } from "../use-endpoint";
import { Item } from "../../types/item";
import { Endpoints } from "../../endpoints";

export const useUpdateItem = () => {
  const endpoint = useEndpoint("PATCH", {
    requiresAuth: true,
  });
  return {
    ...endpoint,
    updateItem: (listId: string, item: Item) => {
      endpoint.request(Endpoints.updateItem(listId, item._id), item);
    },
  };
};

export const useUpdateItemField = () => {
  const endpoint = useEndpoint("PATCH", {
    requiresAuth: true,
  });
  return {
    ...endpoint,
    updateItemField: (
      listId: string,
      itemId: string,
      fieldId: string,
      value: any
    ) => {
      endpoint.request(Endpoints.updateItemField(listId, itemId, fieldId), {
        value,
      });
    },
  };
};
