import { useEffect, useState } from "react";
import useAxios from "./use-axios";
import { List } from "../types/list";

const useList = (id: string) => {
  const [list, setList] = useState<List | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { get } = useAxios();

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true);
        const response = await get<List>(`/list/${id}`);
        setList(response);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchList();
    } else {
      setError("No id specified");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { list, isLoading, error };
};

export default useList;
