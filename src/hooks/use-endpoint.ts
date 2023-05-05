import { useState, useEffect, useContext } from "react";
import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";
import { AuthContext } from "../context/auth-context";

type UseEndpointOptions = {
  requiresAuth?: boolean;
};

export const useEndpoint = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: UseEndpointOptions
) => {
  const { authData } = useContext(AuthContext);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const headers: RawAxiosRequestHeaders = {};
        if (options?.requiresAuth && authData.token) {
          headers["Authorization"] = authData.token;
        }

        const response = await axios.request<T>({
          url,
          method,
          headers,
        });

        setData(response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401) {
            setError("Unauthorized");
          } else {
            setError(axiosError.message);
          }
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, options?.requiresAuth, authData.token]);

  return { isLoading, data, error };
};

export default useEndpoint;
