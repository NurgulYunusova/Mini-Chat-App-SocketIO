/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const login = (username) => {
    setIsLoggedIn(true);
    setName(username);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, name }}>
      {children}
    </AuthContext.Provider>
  );
};
