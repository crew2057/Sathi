import React, { useState } from "react";
import { createContext } from "react";
export const Auth = createContext();
const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState(false);

  return <Auth.Provider value={{ auth, setAuth }}>{children}</Auth.Provider>;
};

export default AuthContext;
