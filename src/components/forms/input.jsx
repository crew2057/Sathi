import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

const InputField = (props) => {
  return (
    <Box
      border="1px solid black"
      borderRadius="1.5em"
      w="75%"
      padding="0.2em 2em 0.5em 0.5em"
    >
      <Text fontSize="1.2rem">{props.title}</Text>
      <Input
        padding="0"
        fontSize="1rem"
        placeholder={props.placeholder}
        focusBorderColor="transparent"
        border="none"
        value={props.value}
        onChange={props.onChange}
      ></Input>
    </Box>
  );
};

export default InputField;
