import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";

function App() {
  const { authData } = useContext(AuthContext);
  const { isAuthenticated } = authData;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("login");
    } else {
      navigate("lists");
    }
  });

  return null;
}

export default App;
