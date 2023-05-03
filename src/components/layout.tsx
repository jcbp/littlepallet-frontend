import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-800 px-4 py-3 mb-5">
        <ul className="flex justify-between">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-300 py-2 px-2 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300 py-2 px-2 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="px-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
