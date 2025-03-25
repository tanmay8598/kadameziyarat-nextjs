import { useContext } from "react";
import AuthContext from "./context";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    localStorage.setItem("token", JSON.stringify(authToken));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, logIn, logOut };
};

export default useAuth;
