import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Boy from "../assets/boy.svg";

import { symptomDiscriptor } from "../pages/Query";

import girlGlass from "../assets/AvatarsGlasses.svg";
const UserCard = ({ data }) => {
  const condition = [
    {
      choice: "Not at all",
      value: 0,
    },
    {
      choice: "Maybe a little",
      value: 0.25,
    },
    {
      choice: "Often",
      value: 0.5,
    },
    {
      choice: "More than often",
      value: 0.75,
    },
    {
      choice: "All the time",
      value: 1,
    },
  ];
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Box margin="auto" marginTop={"2rem"}>
      <Box
        display={"flex"}
        marginTop={"1rem"}
        borderRadius="1rem"
        padding="2rem"
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
      >
        <Flex display={"column"}>
          <Box>
            {data?.gender === "male" ? (
              <Image src={Boy} />
            ) : (
              <Image src={girlGlass} />
            )}
          </Box>
        </Flex>
        <Box padding={"2rem"}>
          <Text fontSize={"1.3rem"} fontWeight={"bold"}>
            User Name:{data?.username}
          </Text>
          <Text fontSize={"1.3rem"} fontWeight={"bold"}>
            Gender:{data?.gender}
          </Text>
          <Text fontSize={"1.3rem"} fontWeight={"bold"}>
            Age:{data?.age}
          </Text>
          <Button
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? "Hide" : "View"} Details...
          </Button>

          {showDetails && (
            <>
              <Text>
                This user has expressed the symptoms below when queried.
              </Text>
              {symptomDiscriptor.map((symptom, index) => {
                return (
                  <Box margin={"1rem"}>
                    <Text fontWeight={"bold"}> When asked: </Text>
                    <Text>{symptom.question}</Text>
                    <Text fontWeight={"bold"}>They answered:</Text>
                    <Text>
                      They feel the above described conditions matching their
                      condition is -
                      <Text as="span" fontWeight={"bold"}>
                        {
                          condition.filter((cond) => {
                            return (
                              cond.value === data.userSymptoms[symptom.key]
                            );
                          })[0].choice
                        }
                      </Text>
                    </Text>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default UserCard;
