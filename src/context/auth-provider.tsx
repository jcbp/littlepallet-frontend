import { useState } from "react";
import axios from "axios";
import { AuthContext, initialAuthData } from "./auth-context";
import { apiEndpoints } from "../api-endpoints";

type LoginCredentials = {
  email: string;
  password: string;
};

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {

  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      return { isAuthenticated: true, token };
    }
    return initialAuthData;
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(apiEndpoints.login(), credentials);
      const token = response.data.access_token;
      setAuthData({
        isAuthenticated: true,
        token: token,
      });
      localStorage.setItem("access_token", token);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const logout = () => {
    setAuthData(initialAuthData);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
