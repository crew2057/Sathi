import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  List,
  ListItem,
  OrderedList,
  Select,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const TherapistSignup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values);
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/user/",
      data: { ...values, role: "therapist" },
    });
    if (res) {
      console.log(res);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box w={"100%"}>
        <Flex marginTop={"2rem"}>
          <Box w={"25%"} borderEnd="1px solid black">
            <Heading fontSize={"1.5rem"}>Terms & Condition</Heading>
            <OrderedList spacing={"1rem"}>
              <ListItem>
                .sjdahkjsdhakjsdhakjhdkajsdhkajsdhaksj akjshdjakshd jkahsdjk
                hasjk hdsjka hjkashkjahskj hjk h ahsjkd hakjsdh akjsjk hasd
              </ListItem>
              <ListItem>
                .sjdahkjsdhakjsdhakjhdkajsdhkajsdhaksj akjshdjakshd jkahsdjk
                hasjk hdsjka hjkashkjahskj hjk h ahsjkd hakjsdh akjsjk hasd
              </ListItem>
              <ListItem>
                .sjdahkjsdhakjsdhakjhdkajsdhkajsdhaksj akjshdjakshd jkahsdjk
                hasjk hdsjka hjkashkjahskj hjk h ahsjkd hakjsdh akjsjk hasd
              </ListItem>
              <ListItem>
                .sjdahkjsdhakjsdhakjhdkajsdhkajsdhaksj akjshdjakshd jkahsdjk
                hasjk hdsjka hjkashkjahskj hjk h ahsjkd hakjsdh akjsjk hasd
              </ListItem>
              <ListItem>
                .sjdahkjsdhakjsdhakjhdkajsdhkajsdhaksj akjshdjakshd jkahsdjk
                hasjk hdsjka hjkashkjahskj hjk h ahsjkd hakjsdh akjsjk hasd
              </ListItem>
            </OrderedList>
          </Box>
          <Box w="75%">
            <Grid templateColumns={"1fr 1fr"} w="90%" gap="1rem">
              <Box
                border="1px solid black"
                borderRadius="1.5rem"
                w="90%"
                margin={"auto"}
                padding="0.3em 2em 0.5em 0.5em"
              >
                <Text fontSize="1rem">Full Name</Text>
                <Input
                  padding="0"
                  fontSize="0.9rem"
                  placeholder="Enter Full Name"
                  focusBorderColor="transparent"
                  border="none"
                  {...register("fullName")}
                ></Input>
              </Box>
              <Box
                border="1px solid black"
                borderRadius="1.5rem"
                w="90%"
                margin={"auto"}
                padding="0.3em 2em 0.5em 0.5em"
              >
                <Text fontSize="1rem">Username</Text>
                <Input
                  padding="0"
                  fontSize="0.9rem"
                  placeholder="Enter Username"
                  focusBorderColor="transparent"
                  border="none"
                  {...register("username")}
                ></Input>
              </Box>
              <Box
                border="1px solid black"
                borderRadius="1.5rem"
                w="90%"
                margin={"auto"}
                padding="0.2em 2em 0.5em 0.5em"
              >
                <Text fontSize="1rem">Password</Text>
                <Input
                  padding="0"
                  fontSize="0.9rem"
                  placeholder="Enter Password"
                  border="none"
                  focusBorderColor="transparent"
                  type="password"
                  {...register("password")}
                ></Input>
              </Box>
              <Flex w="90%">
                <Box
                  border="1px solid black"
                  borderRadius="1.5rem"
                  w="40%"
                  margin={"auto"}
                  padding="0.3em 2em 0.5em 0.5em"
                >
                  <Text fontSize="1rem">Age</Text>
                  <Input
                    padding="0"
                    fontSize="0.9rem"
                    placeholder="Enter Age"
                    focusBorderColor="transparent"
                    border="none"
                    type={"number"}
                    {...register("age")}
                  ></Input>
                </Box>
                <Box
                  border="1px solid black"
                  borderRadius="1.5rem"
                  w="50%"
                  margin={"auto"}
                  padding="0.3em 2em 0.5em 0.5em"
                >
                  <Text fontSize="1rem">Gender</Text>
                  <Select
                    padding="0"
                    fontSize="0.9rem"
                    focusBorderColor="transparent"
                    border="none"
                    {...register("gender")}
                  >
                    <option value={""}>Select Gender</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"other"}>Other</option>
                  </Select>
                </Box>
              </Flex>
              <Box
                border="1px solid black"
                borderRadius="1.5rem"
                w="90%"
                margin={"auto"}
                padding="0.3em 2em 0.5em 0.5em"
              >
                <Text fontSize="1rem">Email</Text>
                <Input
                  padding="0"
                  fontSize="0.9rem"
                  placeholder="Enter Email"
                  focusBorderColor="transparent"
                  border="none"
                  type={"email"}
                  {...register("email")}
                ></Input>
              </Box>
              <Box
                border="1px solid black"
                borderRadius="1.5rem"
                w="90%"
                margin={"auto"}
                padding="0.3em 2em 0.5em 0.5em"
              >
                <Text fontSize="1rem">Address</Text>
                <Input
                  padding="0"
                  fontSize="0.9rem"
                  placeholder="Enter Address"
                  focusBorderColor="transparent"
                  border="none"
                  {...register("address")}
                ></Input>
              </Box>

              <Box
                border="1px solid black"
                borderRadius="1.5rem"
                w="90%"
                margin={"auto"}
                padding="0.3em 2em 0.5em 0.5em"
              >
                <Text fontSize="1rem">Phone No</Text>
                <Input
                  padding="0"
                  fontSize="0.9rem"
                  placeholder="Enter Phone Number"
                  focusBorderColor="transparent"
                  border="none"
                  type={"number"}
                  {...register("phoneno")}
                ></Input>
              </Box>
            </Grid>
            <FormControl marginTop="2rem" marginLeft={"2rem"}>
              <Checkbox colorScheme="green">
                I have read the terms and conditions and agree them.
              </Checkbox>
            </FormControl>
          </Box>
        </Flex>

        <Button
          padding={"1.5rem 2rem"}
          marginTop={"2rem"}
          marginLeft="45%"
          marginBottom={"3rem"}
          borderRadius="1.5em"
          bgColor={"#9fe7ab"}
          fontSize={"1.5rem"}
          color="white"
          type="submit"
        >
          Sign up
        </Button>
      </Box>
    </form>
  );
};
