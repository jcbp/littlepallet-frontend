import { apiEndpoints } from "../../api-endpoints";
import { List } from "../../types/list";
import { ListSummary } from "../../types/list-summary";
import useRequest from "../use-request";

export const useGetTemplates = () => {
  return useRequest<ListSummary[]>(
    "GET",
    { requiresAuth: true },
    apiEndpoints.getTemplates("es")
  );
};

export const useCreateListFromTemplate = (templateId: string) => {
  const {
    loading,
    error,
    request: requestCreateList,
  } = useRequest<List>("POST");

  const createList = async (
    name: string,
    callback?: (newList: List) => void
  ) => {
    const newList = await requestCreateList(
      apiEndpoints.createListFromAnother(templateId),
      {
        name,
      }
    );

    if (newList) {
      if (callback) {
        callback(newList);
      }
    }
  };

  return {
    loading,
    error,
    createList,
  };
};
