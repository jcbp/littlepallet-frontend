import { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout";
import App from "./App";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import ListsIndex from "./pages/lists-index";
import ListDetail from "./pages/list-detail";
import ListEdit from "./pages/list-edit";
import AuthProvider from "./context/auth-provider";
import { AuthContext } from "./context/auth-context";

import "./index.css";
import ListProvider from "./context/list-context-provider";
import ListConfigProvider from "./context/list-config-context-provider";
import ListsProvider from "./context/lists-context-provider";

const CustomWrapper = ({ ...props }) => {
  const { authData } = useContext(AuthContext);
  const location = useLocation();
  return authData.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login/${location.search}`} replace state={{ location }} />
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <ListsProvider>
      <ListProvider>
        <ListConfigProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="lists" element={<CustomWrapper />}>
                  <Route index element={<ListsIndex />} />
                  <Route path=":id" element={<ListDetail />} />
                  <Route path=":id/edit" element={<ListEdit />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ListConfigProvider>
      </ListProvider>
    </ListsProvider>
  </AuthProvider>
);
