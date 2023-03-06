import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeGreen from "../assets/HomeGreen.svg";
import { UserSignup } from "../components/UserSignup";
import { Auth } from "../data/auth";
import queries from "../data/queries.json";
import therapistQuery from "../data/therapistQ.json";
export const Query = () => {
  const [query, setQuery] = useState(0);
  const [query2, setQuery2] = useState(0);
  const [userDetails, setUserdetails] = useState([]);
  const [therapistDetails, setTherapistdetails] = useState([]);

  const navigate = useNavigate();
  console.log(userDetails, therapistDetails);
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
          {query < queries.length ? (
            <>
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
                      setUserdetails([
                        ...userDetails,
                        { [queries[query].title]: option },
                      ]);

                      setQuery(query + 1);
                    }}
                  >
                    {index + 1}) {option}
                  </Button>
                );
              })}
            </>
          ) : (
            <>
              <Heading>
                {query + 1}){therapistQuery[query2].title}
              </Heading>

              {therapistQuery[query2].options.map((option, index) => {
                return (
                  <Button
                    variant={"outline"}
                    padding={" 2rem 3rem"}
                    fontSize={"2rem"}
                    borderRadius={"2rem"}
                    border={"2px solid black"}
                    onClick={() => {
                      setTherapistdetails([
                        ...therapistDetails,
                        { [therapistQuery[query2].title]: option },
                      ]);

                      setQuery(query + 1);
                      setQuery2(query2 + 1);
                    }}
                  >
                    {index + 1}) {option}
                  </Button>
                );
              })}
            </>
          )}
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
  //   console.log(therapistQuery[0]);
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
        minW={"60%"}
        minHeight={"70%"}
        borderRadius={"1rem"}
        padding="3rem"
        paddingBottom={"7rem"}
        marginBlock={"5rem"}
      >
        {query < queries.length + therapistQuery.length ? (
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
            <UserSignup
              data={{
                user: userDetails,
                therapist: therapistDetails,
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
