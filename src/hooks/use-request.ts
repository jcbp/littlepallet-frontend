import { useState, useContext, useEffect, useCallback } from "react";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import { AuthContext } from "../context/auth-context";

type RequestOptions = {
  requiresAuth?: boolean;
};

export const useRequest = <T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  options: RequestOptions = { requiresAuth: true },
  url?: string
) => {
  const { authData, logout } = useContext(AuthContext);
  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (url: string, data?: any) => {
    setLoading(true);
    setError(null);

    try {
      const headers: RawAxiosRequestHeaders = {};
      if (options.requiresAuth && authData.token) {
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
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          setError("Unauthorized");
          logout();
        } else {
          setError(axiosError.message);
        }
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (url) {
      request(url);
    }
  }, [url]);

  return { loading, responseData, error, request };
};

export default useRequest;
