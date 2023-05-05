import { useContext } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AuthContext } from "../context/auth-context";

const useAxios = () => {
  const { authData } = useContext(AuthContext);

  const request = async <T>(config: AxiosRequestConfig) => {
    if (authData.isAuthenticated) {
      config.headers = {
        ...config.headers,
        Authorization: authData.token,
      };
    } else {
      throw new Error("Unauthorized");
    }

    try {
      const response = await axios.request<T>(config);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(axiosError.message);
        }
      } else {
        throw new Error(error.message);
      }
    }
  };

  const get = async <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ method: "GET", url, ...config });

  const post = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => request<T>({ method: "POST", url, data, ...config });

  const patch = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => request<T>({ method: "PATCH", url, data, ...config });

  const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ method: "PUT", url, data, ...config });

  const del = async <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ method: "DELETE", url, ...config });

  const setAuthToken = (token: string) => {
    axios.defaults.headers.common["Authorization"] = token;
  };

  const removeAuthToken = () => {
    delete axios.defaults.headers.common["Authorization"];
  };

  return { get, post, patch, put, delete: del, setAuthToken, removeAuthToken };
};

export default useAxios;
