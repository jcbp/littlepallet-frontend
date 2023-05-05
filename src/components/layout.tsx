import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Button } from "react-bootstrap";

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-4 py-3 mb-5">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-white"
              >
                Home
              </Link>
            </li>
          </ul>
          <Button variant="light" onClick={handleLogout}>Logout</Button>
        </div>
      </nav>

      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
