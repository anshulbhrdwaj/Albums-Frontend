import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || 123);
  const navigateTo = useNavigate();
  const login = (data) => {
    setUser(data);
    localStorage.setItem("site", token);
    navigateTo("/");
    return;
    // try {
    //   const response = await fetch("your-api-endpoint/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const res = await response.json();
    //   if (res.data) {
    //     setUser(res.data.user);
    //     setToken(res.token);
    //     localStorage.setItem("site", res.token);
    //     navigate("/dashboard");
    //     return;
    //   }
    //   throw new Error(res.message);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigateTo("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
