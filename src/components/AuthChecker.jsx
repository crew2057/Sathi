import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../data/auth";

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useContext(Auth);
  useEffect(() => {
    if (!auth) {
      navigate("/notAuthorized");
    }
  }, [auth, navigate]);
  return <div>{children}</div>;
};

export default AuthChecker;
