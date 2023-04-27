import { Box, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";

import UserCard from "../../components/user";
import { User } from "../../data/loggedin";

import { get } from "../../services/middleware";

const TherapistHome = () => {
  // const [users, setUsers] = useState([]);

  const { user } = useContext(User);
  const fetch = async () => {
    const res = await get(`/therapist/users/${user.id}`);
    return res.data;
  };
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch(),

    enabled: user.id !== undefined,
  });

  if (userQuery.isLoading) return <Box>Loading....</Box>;
  if (userQuery.isError) return <Box>Error</Box>;
  return (
    <Box padding={"1rem"}>
      <Heading>
        Hello this is your home page where you can see the users assigned to
        you.
      </Heading>
      {!(userQuery.data.users.length > 0) ? (
        <Text fontSize={"1.25rem"} textAlign="center" marginTop={"20rem"}>
          Sorry but there are no users currently assigned to you. If we find
          someone you can be of help to we will let you know.
        </Text>
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
            {userQuery.data.users.map((user, index) => {
              return <UserCard key={index} data={user} />;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TherapistHome;
