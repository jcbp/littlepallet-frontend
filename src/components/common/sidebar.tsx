import React from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface SidebarLink {
  text: string;
  to?: string;
  icon: React.ComponentType;
  onClick?: () => void;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  collapseCompletely?: boolean;
  toggleSidebar: () => void;
  links: SidebarLink[];
  children: React.ReactNode;
  bottomLinks: SidebarLink[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  collapseCompletely = true,
  toggleSidebar,
  links,
  children,
  bottomLinks,
}) => {
  const SidebarLinkItem: React.FC<SidebarLink> = ({
    text,
    to,
    icon,
    onClick,
  }) => {
    const Icon = icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    const itemClasses = clsx(
      "flex items-center text-gray-400 rounded-md transition-colors duration-200",
      {
        "py-2 px-3": isSidebarOpen,
        "p-1": !isSidebarOpen,
      },
      window.location.pathname === to
        ? "bg-gray-800 text-white"
        : "hover:bg-gray-800"
    );
    const itemContent = (
      <>
        <Icon className="w-5 h-5" />
        <span className={`ml-2 ${isSidebarOpen ? "" : "hidden"} capitalize`}>
          {text}
        </span>
      </>
    );
    return (
      <li>
        {to ? (
          <NavLink
            to={to}
            className={itemClasses}
            onClick={() => toggleSidebar()}
          >
            {itemContent}
          </NavLink>
        ) : (
          <button onClick={onClick} className={clsx(itemClasses, "w-full")}>
            {itemContent}
          </button>
        )}
      </li>
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-72" : collapseCompletely ? "w-0" : "w-16"
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
        <nav className="px-2 py-2">
          <ul className="space-y-2">
            {links.map((link, index) => (
              <SidebarLinkItem key={index} {...link} />
            ))}
          </ul>
        </nav>
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-2 pb-6">
          <ul className="space-y-2">
            {bottomLinks.map((link, index) => (
              <SidebarLinkItem key={index} {...link} />
            ))}
          </ul>
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {children}
    </div>
  );
};

export default Sidebar;
