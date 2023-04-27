import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeGreen from "../assets/HomeGreen.svg";
import { TherapistSignup } from "../components/TherapistSignup";

export const SignUp = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      alignItems="center"
      flexDirection={"column"}
      gap="1rem"
      minH="100vh"
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
        minHeight={"50vh"}
        borderRadius={"1rem"}
        padding="1rem"
      >
        {role !== "" && (
          <Text
            cursor={"pointer"}
            _hover={{
              textDecoration: "underline",
            }}
            fontSize={"1.5rem"}
            onClick={() => {
              setRole("");
            }}
          >
            Back
          </Text>
        )}
        <Heading textAlign={"center"} fontSize={"4rem"}>
          {role} SignUp
        </Heading>
        {role === "" && (
          <Flex direction="column" gap="2rem" alignItems={"center"} w="100%">
            <Heading>Who do you want to register as?</Heading>
            <Button
              background="none"
              padding={" 2rem 4rem"}
              margin={"auto"}
              borderRadius="1.5em"
              bgColor={"#9fe7ab"}
              color="white"
              onClick={() => {
                setRole("User");
              }}
              fontSize={"1.5rem"}
            >
              User
            </Button>
            <Button
              background="none"
              padding={"2rem 2.2rem"}
              margin={"auto"}
              borderRadius="1.5em"
              bgColor={"#9fe7ab"}
              color="white"
              fontSize={"1.5rem"}
              onClick={() => {
                setRole("Therapist");
              }}
            >
              Therapist
            </Button>
          </Flex>
        )}

        {role === "" ? null : role === "User" ? (
          <Flex
            direction={"column"}
            w="50%"
            margin={"auto"}
            marginTop="1rem"
            gap={"2rem"}
          >
            <Heading textAlign={"center"}>
              Please fill a short questionare before signing up
            </Heading>
            <Button
              onClick={() => {
                navigate("/query");
              }}
              variant="outline"
              border={"1px solid black"}
            >
              Proceed
            </Button>
          </Flex>
        ) : (
          <TherapistSignup />
        )}
      </Box>
    </Box>
  );
};
