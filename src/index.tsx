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
import MyPrivateLists from "./pages/my-private-lists";
import MySharedLists from "./pages/my-shared-lists";
import ListsSharedWithMe from "./pages/lists-shared-with-me";
import ListDetail from "./pages/list-detail";
import ListEdit from "./pages/list-edit";
import AuthProvider from "./context/auth-provider";
import { AuthContext } from "./context/auth-context";

import "./index.css";
import ListStoreProvider from "./context/list-store";
import ListConfigProvider from "./context/list-config";
import ListsProvider from "./context/lists";
import Templates from "./pages/templates";
import Trash from "./pages/trash";

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
      <ListStoreProvider>
        <ListConfigProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="lists" element={<CustomWrapper />}>
                  <Route index element={<MyPrivateLists />} />
                  <Route path="shared-by-me" element={<MySharedLists />} />
                  <Route path="shared-with-me" element={<ListsSharedWithMe />} />
                  <Route path=":id" element={<ListDetail />} />
                  <Route path=":id/edit" element={<ListEdit />} />
                </Route>
                <Route path="templates" element={<CustomWrapper />}>
                  <Route index element={<Templates />} />
                  <Route path=":id" element={<ListDetail />} />
                  <Route path=":id/edit" element={<ListEdit />} />
                </Route>
                <Route path="trash" element={<CustomWrapper />}>
                  <Route index element={<Trash />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ListConfigProvider>
      </ListStoreProvider>
    </ListsProvider>
  </AuthProvider>
);
