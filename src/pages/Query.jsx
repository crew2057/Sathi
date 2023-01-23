import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeGreen from "../assets/HomeGreen.svg";
import { UserSignup } from "../components/UserSignup";
import queries from "../data/queries.json";
export const Query = () => {
  const [query, setQuery] = useState(0);
  const [userDetails, setUserdetails] = useState([]);
  const [therapistDetails, setTherapistdetails] = useState([]);
  const navigate = useNavigate();
  const renderQuestion = () => {
    return (
      <>
        <Flex
          direction="column"
          gap="2rem"
          alignItems={"center"}
          paddingTop="2rem"
          w="100%"
        >
          <Heading>
            {query + 1}){queries[query].title}
          </Heading>

          {queries[query].options.map((option, index) => {
            return (
              <Button
                variant={"outline"}
                padding={" 2rem 3rem"}
                fontSize={"2rem"}
                borderRadius={"2rem"}
                border={"2px solid black"}
                onClick={() => {
                  if (queries[query].type === "userDetails") {
                    setUserdetails([...userDetails, option]);
                  } else {
                    setTherapistdetails([...therapistDetails, option]);
                  }
                  setQuery(query + 1);
                }}
              >
                {index + 1}) {option.title}
              </Button>
            );
          })}
          {/* <Button
            background="none"
            padding={" 2rem 3rem"}
            margin={"auto"}
            fontSize={"2rem"}
            borderRadius="1.5em"
            bgColor={"#9fe7ab"}
            color="white"
            onClick={() => {
              //   navigate("/ln/home");
            }}
          >
            Proceed
          </Button> */}
        </Flex>
      </>
    );
  };
  console.log(userDetails, therapistDetails);
  //   console.log(queries[0]);
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
        minHeight={"70%"}
        borderRadius={"1rem"}
        padding="3rem"
        paddingBottom={"7rem"}
        marginBlock={"5rem"}
      >
        {query < queries.length ? (
          <>
            <Heading>Find the right therapist for you</Heading>
            <Text>
              Fill this short questionnare so we can help you find the right
              therapist for you
            </Text>

            {renderQuestion()}
          </>
        ) : (
          <>
            <Heading>
              Thank You for taking your time to fill this questionare.
            </Heading>
            <Text>
              Before we reccomend your therapist we would like you to signup
              such that we can provide you a better experience.
            </Text>
            <UserSignup />
          </>
        )}
      </Box>
    </Box>
  );
};
