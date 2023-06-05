import { useState } from "react";
import axios from "axios";
import { apiEndpoints } from "../api-endpoints";
import { createContext, useContext } from "react";

type AuthData = {
  isAuthenticated: boolean;
  token: string | null;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  authData: AuthData;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
};

export const initialAuthData: AuthData = {
  isAuthenticated: false,
  token: null,
};

export const AuthContext = createContext<AuthContextType>({
  authData: initialAuthData,
  login: async (credentials: LoginCredentials) => {},
  signup: async (credentials: SignupCredentials) => {},
  logout: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
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

  const signup = async (credentials: SignupCredentials) => {
    try {
      const response = await axios.post(apiEndpoints.signup(), credentials);
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

  return (
    <AuthContext.Provider value={{ authData, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
