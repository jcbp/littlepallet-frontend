import { useState } from "react";
import axios from "axios";
import useAxios from "../hooks/use-axios";
import { AuthContext, initialAuthData } from "./auth-context";

type LoginCredentials = {
  email: string;
  password: string;
};

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const {
    setAuthToken: setAxiosAuthToken,
    removeAuthToken: removeAxiosAuthToken,
  } = useAxios();

  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAxiosAuthToken(token);
      return { isAuthenticated: true, token };
    }
    return initialAuthData;
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post("/user/login", credentials);
      const token = response.data.access_token;
      setAuthData({
        isAuthenticated: true,
        token: token,
      });
      localStorage.setItem("access_token", token);
      setAxiosAuthToken(token);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const logout = () => {
    setAuthData(initialAuthData);
    localStorage.removeItem("access_token");
    removeAxiosAuthToken();
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
