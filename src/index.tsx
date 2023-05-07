import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import App from "./App";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import ListsIndex from "./pages/lists-index";
import ListDetail from "./pages/list-detail";
import AuthProvider from "./context/auth-provider";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="lists" element={<ListsIndex />} />
          <Route path="lists/:id" element={<ListDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
