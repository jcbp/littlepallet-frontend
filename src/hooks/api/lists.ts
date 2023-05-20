import { useContext, useEffect } from "react";
import { apiEndpoints } from "../../api-endpoints";
import { ListsContext } from "../../context/lists-context-provider";
import { ListSummary } from "../../types/list-summary";
import useRequest from "../use-request";

export const useGetLists = () => {
  const { lists, setLists } = useContext(ListsContext);

  const {
    loading,
    error,
    request: fetchLists,
  } = useRequest<ListSummary[]>("GET");

  useEffect(() => {
    fetchLists(apiEndpoints.getLists()).then((responseData) => {
      if (responseData) {
        setLists(responseData);
      }
    });
  }, []);

  return {
    lists,
    loading,
    error,
  };
};

export const useCreateList = () => {
  const { lists, setLists } = useContext(ListsContext);

  const {
    loading,
    error,
    request: requestCreateList,
  } = useRequest<ListSummary>("POST");

  const createList = async (
    name: string,
    callback?: (newList: ListSummary) => void
  ) => {
    const newList = await requestCreateList(apiEndpoints.createList(), {
      name,
    });

    if (newList) {
      setLists([...lists, newList]);
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
