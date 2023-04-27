import React, { useContext } from "react";

import { User } from "../data/loggedin";

import TherapistHome from "./therapist/Home";
import UserHome from "./user/Home";

const LoggedinHome = () => {
  const { user } = useContext(User);

  if (user.role === "user") {
    return <UserHome />;
  } else if (user.role === "therapist") {
    return <TherapistHome />;
  }
};

export default LoggedinHome;
