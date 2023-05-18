import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "./common/button";

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-800 px-4 py-2.5 mb-5 sticky top-0 z-20">
        <div className="mx-auto flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>
          </ul>
          <Button variant="light" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
