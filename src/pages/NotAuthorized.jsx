import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const NotAuthorized = () => {
  const navigate = useNavigate();
  return (
    <Box bg={"black"} height="100vh" color="white">
      <Heading paddingTop={"10rem"}>
        You are not authorized to view this page.
      </Heading>
      <Text>please login first</Text>
      <Button
        onClick={() => {
          navigate("/login");
        }}
        color="black"
      >
        Login
      </Button>
    </Box>
  );
};
