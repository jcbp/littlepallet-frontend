import { apiEndpoints } from "../../api-endpoints";
import { ListSummary } from "../../types/list-summary";
import useRequest from "../use-request";

export const useGetTrashedLists = () => {
  return useRequest<ListSummary[]>(
    "GET",
    { requiresAuth: true },
    apiEndpoints.getTrashedLists()
  );
};

export const useHardDeleteList = () => {
  const {
    loading,
    error,
    request: requestHardDeleteList,
  } = useRequest<void>("DELETE");

  const hardDeleteList = async (id: string) => {
    await requestHardDeleteList(apiEndpoints.hardDeleteList(id));
  };

  return {
    loading,
    error,
    hardDeleteList,
  };
};
