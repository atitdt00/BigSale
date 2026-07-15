// import { createContext } from "react";
// import { toast } from "react-toastify";

import { createContext, useContext, useEffect, useState } from "react";

// export const userAuth = (setOpenLogin) => {
//   const token = sessionStorage.getItem("token");
//   if (!token) {
//     toast.error("please login first");
//     setOpenLogin(true);
//     return false;
//   }
//   return true;
// };

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const [user, setUser] = useState({
    email: sessionStorage.getItem("email") || "",
    role: sessionStorage.getItem("role") || "",
  });

  const login = (user, token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("role", user.role);

    setUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser({
      email: "",
      role: "",
    })
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
