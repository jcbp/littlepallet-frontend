import { useEndpoint } from "../use-endpoint";
import { ListSummary } from "../../types/list-summary";
import { List } from "../../types/list";
import { Endpoints } from "../../endpoints";

export const useGetLists = () => {
  return useEndpoint<ListSummary[]>(
    "GET",
    {
      requiresAuth: true,
    },
    Endpoints.getLists()
  );
};

export const useGetList = (id: string) => {
  return useEndpoint<List>(
    "GET",
    {
      requiresAuth: true,
    },
    Endpoints.getList(id)
  );
};
