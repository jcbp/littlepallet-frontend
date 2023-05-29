import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Sidebar from "./common/sidebar";
import {
  ListBulletIcon,
  UsersIcon,
  RectangleStackIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-800 px-4 py-2.5 sticky top-0 z-20">
        <div className="mx-auto flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none focus:text-white"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </li>
          </ul>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-white me-2"
          >
            <UserCircleIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        links={[
          { text: "Mis listas personales", icon: ListBulletIcon, to: "/lists" },
          { text: "Mis listas compartidas", icon: UsersIcon, to: "/lists/shared-by-me" },
          { text: "Listas compartidas conmigo", icon: RectangleStackIcon, to: "/lists/shared-with-me" },
        ]}
        bottomLinks={[
          {
            text: "Salir",
            icon: ArrowLeftOnRectangleIcon,
            onClick: handleLogout,
          },
        ]}
      >
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </Sidebar>
    </>
  );
};

export default Layout;
