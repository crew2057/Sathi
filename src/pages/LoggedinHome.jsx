import { Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../data/auth";
import { User } from "../data/loggedin";
import { get } from "../services/middleware";
import TherapistHome from "./therapist/Home";
import UserHome from "./user/Home";

const LoggedinHome = () => {
  const { user, setUser } = useContext(User);

  if (user.role === "user") {
    return <UserHome />;
  } else if (user.role === "therapist") {
    return <TherapistHome />;
  }
};

export default LoggedinHome;
