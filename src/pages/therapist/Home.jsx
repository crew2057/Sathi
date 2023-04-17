import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import UserCard from "../../components/user";
import { User } from "../../data/loggedin";
import { get } from "../../services/middleware";

const TherapistHome = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(User);
  const fetch = useCallback(async () => {
    const res = await get(`/therapist/users/${user.id}`);
    if (res) {
      console.log(res.data.users);
      setUsers(res.data.users);
    }
  }, [user.id]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <Box padding={"1rem"}>
      <Heading>Therapist home page</Heading>
      {!users.length > 0 ? (
        <Heading>No users assigned</Heading>
      ) : (
        <Box marginTop={"1rem"}>
          <Heading fontSize={"1.7rem"}>
            Your{" "}
            <Box as="span" color={"#7CC35B"}>
              Saathi's
            </Box>{" "}
            that you can help guide through their problems:
          </Heading>
          <Box>
            {users.map((user) => {
              return <UserCard data={user} />;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TherapistHome;
