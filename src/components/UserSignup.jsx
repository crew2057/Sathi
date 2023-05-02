import { Box, Button, Grid, Input, Select, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { post } from "../services/middleware";
import { Auth } from "../data/auth";
export const UserSignup = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setAuth } = useContext(Auth);
  const onSubmit = async (values) => {
    const res = await post("http://localhost:5000/user/", {
      ...values,
      userSymptoms: props.data.symptoms,
      therapistDetails: {
        communicationType: Object.values(props?.data.therapist[0])[0],
        gender: Object.values(props?.data.therapist[1])[0],
        age: Object.values(props?.data.therapist[2])[0],
        speciality: Object.values(props?.data.therapist[3])[0],
      },
      role: "user",
    });
    if (res.status === 200) {
      console.log(res);
      localStorage.setItem("Stoken", res.data.token);
      localStorage.setItem("userId", res.data.id);
      setAuth(true);
      navigate("/home");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box w={"100%"}>
        <Grid templateColumns={"1fr"} gap="1rem">
          <Box
            border={errors.username ? "1px solid red" : "1px solid black"}
            pos="relative"
            borderRadius="1.5rem"
            w="75%"
            margin={"auto"}
            padding="0.3em 2em 0.5em 0.5em"
          >
            <Text
              pos="absolute"
              fontSize={"0.8rem"}
              top={"-20px"}
              color={"red"}
            >
              {errors.username && errors.username.message}
            </Text>
            <Text fontSize="1rem">Username</Text>
            <Input
              padding="0"
              fontSize="0.9rem"
              placeholder="Enter Username"
              focusBorderColor="transparent"
              border="none"
              {...register("username", {
                required: "Please Enter UserName",
              })}
            ></Input>
          </Box>
          <Box
            border={errors.age ? "1px solid red" : "1px solid black"}
            pos="relative"
            borderRadius="1.5rem"
            w="75%"
            margin={"auto"}
            padding="0.3em 2em 0.5em 0.5em"
          >
            <Text
              pos="absolute"
              fontSize={"0.8rem"}
              top={"-20px"}
              color={"red"}
            >
              {errors.age && errors.age.message}
            </Text>
            <Text fontSize="1rem">Age</Text>
            <Input
              padding="0"
              fontSize="0.9rem"
              placeholder="Enter Age"
              focusBorderColor="transparent"
              border="none"
              type={"number"}
              {...register("age", {
                required: "Please Enter age",
              })}
            ></Input>
          </Box>
          <Box
            border={errors.gender ? "1px solid red" : "1px solid black"}
            pos="relative"
            borderRadius="1.5rem"
            w="75%"
            margin={"auto"}
            padding="0.3em 2em 0.5em 0.5em"
          >
            <Text
              pos="absolute"
              fontSize={"0.8rem"}
              top={"-20px"}
              color={"red"}
            >
              {errors.gender && errors.gender.message}
            </Text>
            <Text fontSize="1rem">Gender</Text>
            <Select
              padding="0"
              fontSize="0.9rem"
              focusBorderColor="transparent"
              border="none"
              {...register("gender", {
                required: "Please select your gender",
              })}
            >
              <option value={""}>Select Gender</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </Select>
          </Box>

          <Box
            border={errors.email ? "1px solid red" : "1px solid black"}
            pos="relative"
            borderRadius="1.5rem"
            w="75%"
            margin={"auto"}
            padding="0.3em 2em 0.5em 0.5em"
          >
            <Text
              pos="absolute"
              fontSize={"0.8rem"}
              top={"-20px"}
              color={"red"}
            >
              {errors.email && errors.email.message}
            </Text>
            <Text fontSize="1rem">Email</Text>
            <Input
              padding="0"
              fontSize="0.9rem"
              placeholder="Enter Email"
              focusBorderColor="transparent"
              border="none"
              type={"email"}
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Please enter a valid email",
                },
              })}
            ></Input>
          </Box>

          <Box
            border={errors.password ? "1px solid red" : "1px solid black"}
            pos="relative"
            borderRadius="1.5rem"
            w="75%"
            margin={"auto"}
            padding="0.2em 2em 0.5em 0.5em"
          >
            <Text
              pos="absolute"
              fontSize={"0.8rem"}
              top={"-20px"}
              color={"red"}
            >
              {errors.password && errors.password.message}
            </Text>
            <Text fontSize="1rem">Password</Text>
            <Input
              padding="0"
              fontSize="0.9rem"
              placeholder="Enter Password"
              border="none"
              focusBorderColor="transparent"
              type="password"
              {...register("password", {
                required: "Please enter your password",
              })}
            ></Input>
          </Box>
        </Grid>
        <Button
          padding={"1.5rem 2rem"}
          marginTop={"2rem"}
          marginLeft="45%"
          marginBottom={""}
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
