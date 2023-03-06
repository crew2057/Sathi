import { Heading, Text } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { User } from "../../data/loggedin";
import { get } from "../../services/middleware";

const TherapistHome = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(User);
  const fetch = useCallback(async () => {
    const res = await get(`/therapist/users/${user.id}`);
    if (res) {
      console.log(res);
    }
  }, [user.id]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <div>
      <Heading padding={"10rem"}>Therapist home page</Heading>
      <Text>{!(users.length > 0) && "No users assigned"}</Text>
    </div>
  );
};

export default TherapistHome;
