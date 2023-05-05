import { useEffect, useState } from "react";
import useAxios from "./use-axios";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export const useEndpoint = <T>(
  endpointName: string,
  httpMethod: HttpMethod,
  params?: Record<string, string>
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { get, post, put, patch, delete: del } = useAxios();

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        setIsLoading(true);
        const response = await (httpMethod === "get"
          ? get<T>(endpointName, params)
          : httpMethod === "post"
          ? post<T>(endpointName, params)
          : httpMethod === "put"
          ? put<T>(endpointName, params)
          : httpMethod === "patch"
          ? patch<T>(endpointName, params)
          : del<T>(endpointName, params));
        setData(response);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchEndpoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
};
