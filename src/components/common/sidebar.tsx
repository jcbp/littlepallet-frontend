import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface SidebarLink {
  text: string;
  to: string;
  icon: React.ComponentType;
}

interface SidebarProps {
  links: SidebarLink[];
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ links, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } fixed inset-y-0 left-0 bg-gray-900 text-white transition-width duration-300 ease-in-out transform z-50 overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-xl font-bold ${isSidebarOpen ? "" : "hidden"}`}>
            Sidebar
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-white"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            {links.map((link, index) => {
              const Icon = link.icon as React.ComponentType<
                React.SVGProps<SVGSVGElement>
              >;
              return (
                <li key={index}>
                  <NavLink
                    to={link.to}
                    className={clsx(
                      "flex items-center text-gray-400 rounded-md transition-colors duration-200",
                      {
                        "py-2 px-3": isSidebarOpen,
                        "p-1": !isSidebarOpen,
                      },
                      window.location.pathname === link.to
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-800"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span
                      className={`ml-2 ${
                        isSidebarOpen ? "" : "hidden"
                      } capitalize`}
                    >
                      {link.text}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {children}
    </div>
  );
};

export default Sidebar;
