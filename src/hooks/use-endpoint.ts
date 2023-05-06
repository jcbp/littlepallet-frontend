import { useState, useEffect, useContext } from "react";
import axios, { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { AuthContext } from "../context/auth-context";

type UseEndpointOptions = {
  requiresAuth?: boolean;
};

export const useEndpoint = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  options?: UseEndpointOptions,
  data?: any
) => {
  const { authData } = useContext(AuthContext);
  const [responseData, setResponseData] = useState<T | null>(null);
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

        const config: AxiosRequestConfig = {
          url,
          method,
          headers,
          data: data ?? undefined,
        };

        const response = await axios.request<T>(config);

        setResponseData(response.data);
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
  }, [url, method, options?.requiresAuth, authData.token, data]);

  return { isLoading, responseData, error };
};

export default useEndpoint;
