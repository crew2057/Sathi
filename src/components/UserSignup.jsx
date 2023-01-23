import { Box, Button, Grid, Input, Select, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
export const UserSignup = () => {
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
      data: { ...values, role: "user" },
    });
    if (res) {
      console.log(res);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box w={"100%"}>
        <Grid templateColumns={"1fr"} gap="1rem">
          <Box
            border="1px solid black"
            borderRadius="1.5rem"
            w="75%"
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
            w="75%"
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
            w="75%"
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
          <Box
            border="1px solid black"
            borderRadius="1.5rem"
            w="75%"
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
            w="75%"
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
            w="75%"
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
          <Box
            border="1px solid black"
            borderRadius="1.5rem"
            w="75%"
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
        </Grid>
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
