import { useEffect, useState } from "react";
import useAxios from "./use-axios";

type List = {
  _id: number;
  name: string;
};

const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { get } = useAxios();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setIsLoading(true);
        const response = await get<List[]>("/list");
        setLists(response);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { lists, isLoading, error };
};

export default useLists;
