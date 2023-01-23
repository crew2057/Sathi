import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeGreen from "../assets/HomeGreen.svg";
export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/login/",
      data: { ...login },
    });

    if (res) {
      console.log(res);
    }
  };
  return (
    <Box
      display={"flex"}
      alignItems="center"
      flexDirection={"column"}
      gap="1rem"
      h="100vh"
      bgImage={HomeGreen}
      justifyContent={"center"}
      w="100%"
      bgPos={"center 300px "}
      bgSize="cover"
      bgRepeat={"no-repeat"}
    >
      <Box
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
        bg={"white"}
        w={"60%"}
        height={"70%"}
        borderRadius={"1rem"}
        padding="1rem"
      >
        <Heading textAlign={"center"} fontSize={"4rem"}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Flex
            direction="column"
            gap="2rem"
            alignItems={"center"}
            marginTop={"5rem"}
            w="100%"
          >
            <Box
              border="1px solid black"
              borderRadius="1.5em"
              w="75%"
              padding="0.2em 2em 0.5em 0.5em"
            >
              <Text fontSize="1.2rem">Email</Text>
              <Input
                padding="0"
                fontSize="1rem"
                placeholder="Enter Email"
                focusBorderColor="transparent"
                border="none"
                onChange={(e) => {
                  setLogin({
                    ...login,
                    email: e.target.value,
                  });
                }}
              ></Input>
            </Box>
            <Box
              border="1px solid black"
              borderRadius="1.5em"
              w="75%"
              padding="0.2em 2em 0.5em 0.5em"
            >
              <Text fontSize="1.2rem">Password</Text>
              <Input
                padding="0"
                fontSize="1rem"
                placeholder="Enter Password"
                border="none"
                focusBorderColor="transparent"
                type="password"
                onChange={(e) => {
                  setLogin({
                    ...login,
                    password: e.target.value,
                  });
                }}
              ></Input>
            </Box>

            <Button
              background="none"
              padding={"2rem 4rem"}
              margin={"auto"}
              fontSize={"1.5rem"}
              borderRadius="1.5em"
              bgColor={"#9fe7ab"}
              color="white"
              type="submit"
            >
              Login
            </Button>
            <Text fontSize={"1.2rem"}>
              Dont have an account?
              <Text
                cursor={"pointer"}
                _hover={{
                  color: "#9fe7ab",
                }}
                as={"span"}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                {" "}
                Sign Up
              </Text>
            </Text>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
