import { apiEndpoints } from "../../api-endpoints";
import { ListSummary } from "../../types/list-summary";
import useRequest from "../use-request";

export const useGetTemplates = () => {
  return useRequest<ListSummary[]>(
    "GET",
    { requiresAuth: true },
    apiEndpoints.getTemplates('es')
  );
};
