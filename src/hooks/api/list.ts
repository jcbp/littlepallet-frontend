import { useEndpoint } from "../use-endpoint";
import { ListSummary } from "../../types/list-summary";
import { List } from "../../types/list";
import { Endpoints } from "../../endpoints";

export const useGetLists = () => {
  return useEndpoint<ListSummary[]>(Endpoints.getLists(), "GET", {
    requiresAuth: true,
  });
};

export const useGetList = (id: string) => {
  return useEndpoint<List>(Endpoints.getList(id), "GET", {
    requiresAuth: true,
  });
};
