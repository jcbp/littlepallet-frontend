import { useEndpoint } from "./use-endpoint";
import { List } from "../types/list";
import { Endpoints } from "../endpoints";

export const useGetList = (id: string) => {
  return useEndpoint<List>(Endpoints.getList(id), "get");
};

