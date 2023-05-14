import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../data/auth";

const Redirect = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useContext(Auth);
  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, [auth, navigate]);
  if (auth) {
    return;
  }
  return <div>{children}</div>;
};

export default Redirect;
