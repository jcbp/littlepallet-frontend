import { createContext } from "react";

type AuthData = {
  isAuthenticated: boolean;
  token: string | null;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  authData: AuthData;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

export const initialAuthData: AuthData = {
  isAuthenticated: false,
  token: null,
};

export const AuthContext = createContext<AuthContextType>({
  authData: initialAuthData,
  login: async (credentials: LoginCredentials) => {},
  logout: () => {},
});
