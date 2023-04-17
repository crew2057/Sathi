import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Boy from "../assets/boy.svg";
import girlGlass from "../assets/AvatarsGlasses.svg";
const UserCard = ({ data }) => {
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
        </Box>
      </Box>
    </Box>
  );
};
export default UserCard;
