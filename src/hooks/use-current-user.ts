import { useContext, useState, useEffect } from "react";
import useAxios from "./use-axios";
import { AuthContext } from "../context/auth-context";

const useCurrentUser = () => {
  const { authData } = useContext(AuthContext);
  const axios = useAxios();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const refreshCurrentUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<any>("/user/current");
        setCurrentUser(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (authData.isAuthenticated) {
      refreshCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.isAuthenticated]);

  return { currentUser, isLoading, error };
};

export default useCurrentUser;
