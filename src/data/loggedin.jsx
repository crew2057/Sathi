import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { get } from "../services/middleware";
import { Auth } from "./auth";
export const User = createContext();
const UserContext = ({ children }) => {
  const { auth } = useContext(Auth);
  const [user, setUser] = useState({
    id: 0,
    role: "",
    likedBlogs: [],
  });
  const [therapistAssigned, setTherapistAssigned] = useState(false);
  const init = async () => {
    let id = localStorage.getItem("userId");
    const res = await get(`/user/${id}`);
    console.log(res);
    if (res) {
      setUser({
        id: res.data.user._id,
        role: res.data.user.role,
        therapistDetails: res.data.user.therapistDetails,
        likedBlogs: [...res.data.user.likedBlogs],
      });

      if (
        res.data.user.role === "user" &&
        res.data.user.therapistAssigned !== undefined &&
        res.data.user.therapistAssigned !== ""
      ) {
        setTherapistAssigned(true);
      } else {
        setTherapistAssigned(false);
      }
    }
  };
  useEffect(() => {
    if (auth) {
      init();
    }
  }, [auth]);

  return (
    <User.Provider
      value={{ user, setUser, therapistAssigned, setTherapistAssigned, init }}
    >
      {children}
    </User.Provider>
  );
};

export default UserContext;
