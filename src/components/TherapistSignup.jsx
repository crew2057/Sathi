import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  ListItem,
  OrderedList,
  Select,
  Text,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { post } from "../services/middleware";

export const TherapistSignup = () => {
  const [therapistDetails, setTherapistDetails] = useState({
    speciality: "",
    communicationType: "",
  });
  const [terms, setTerms] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [extraErrors, setExtraErrors] = useState({
    speciality: false,
    communicationType: false,
    term: false,
  });
  const onSubmit = async (values) => {
    if (therapistDetails.speciality === "") {
      setExtraErrors((err) => {
        return {
          ...err,
          speciality: true,
        };
      });
    }
    if (therapistDetails.communicationType === "") {
      setExtraErrors((err) => {
        return {
          ...err,
          communicationType: true,
        };
      });
    }
    if (!terms) {
      setExtraErrors((err) => {
        return {
          ...err,
          term: true,
        };
      });
    }
    if (
      !(
        therapistDetails.speciality === "" &&
        therapistDetails.communicationType === "" &&
        !terms
      )
    ) {
      setExtraErrors({
        speciality: false,
        communicationType: false,
        term: false,
      });
      const res = await post("http://localhost:5000/user/", {
        ...values,
        therapistDetails: therapistDetails,
        role: "therapist",
      });
      if (res) {
        navigate("/login");
      }
    }
  };

  return (
    <Flex w={"100%"}>
      <Box
        h="70vh"
        overflowY={"scroll"}
        borderEnd="1px solid black"
        pos={"relative"}
        padding="1rem"
        flex={"80%"}
      >
        <Heading fontSize={"1.5rem"}>Terms & Condition</Heading>
        <Text fontWeight={"bold"}>Scroll to read all :</Text>
        <OrderedList spacing={"2rem"}>
          <ListItem>
            Eligibility: Only licensed and qualified therapists are permitted to
            sign up and use our mental health website for the purpose of
            providing therapy services to clients.
          </ListItem>
          <ListItem>
            Professional Standards: Therapists must adhere to the highest
            standards of professionalism, ethics, and conduct in accordance with
            their respective governing body and industry best practices.
          </ListItem>
          <ListItem>
            Privacy and Confidentiality: Therapists are required to maintain the
            highest levels of client confidentiality and privacy at all times in
            accordance with applicable laws and regulations. They must also
            adhere to the website's privacy policy and terms of use.
          </ListItem>
          <ListItem>
            Scope of Services: Therapists may only provide therapy services that
            are within the scope of their license, training, and experience.
            They may not provide medical advice, prescribe medications, or
            engage in any other activity that falls outside of their
            professional scope of practice.
          </ListItem>
          <ListItem>
            Client Rights: Therapists must respect and uphold the rights of
            clients at all times, including their right to informed consent,
            autonomy, and confidentiality. They must also respect the diversity
            of clients and provide services in a culturally sensitive and
            inclusive manner.
          </ListItem>
          <ListItem>
            Payment and Fees: Therapists must be transparent and accurate in
            their billing and payment practices. They may not charge clients for
            services that were not provided or engage in any other fraudulent or
            unethical billing practices.
          </ListItem>
          <ListItem>
            Communication: Therapists must maintain professional communication
            with clients at all times, including through the website's messaging
            system. They may not engage in any form of inappropriate or
            unprofessional communication, including but not limited to
            harassment, discrimination, or boundary violations.
          </ListItem>
          <ListItem>
            Termination of Services: Therapists may terminate their services
            with clients at any time for any reason, provided they follow all
            applicable laws and regulations and provide adequate notice and
            referrals to alternative providers.
          </ListItem>
        </OrderedList>
      </Box>

      <Box padding={"1rem"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            border={
              extraErrors.speciality ? "1px solid red" : "1px solid black"
            }
            pos="relative"
            borderRadius="1.5rem"
            w="80%"
            margin={"auto"}
            marginBottom={"1rem"}
            padding="0.3em 2em 0.5em 0.5em"
          >
            <Text
              pos="absolute"
              fontSize={"0.8rem"}
              top={"-20px"}
              color={"red"}
            >
              {extraErrors.speciality && (
                <Text color={"red"}>Please Select Your Speciality</Text>
              )}
            </Text>
            <Text fontSize="1rem">What is your field of Speciality?</Text>
            <Select
              padding="0"
              fontSize="0.9rem"
              focusBorderColor="transparent"
              border="none"
              onChange={(e) => {
                setTherapistDetails({
                  ...therapistDetails,
                  speciality: e.target.value,
                });
              }}
            >
              <option value={""}>Select Speciality</option>
              <option value={"Family"}>Family</option>
              <option value={"Addiction"}>Addiction</option>
              <option value={"Behaviour"}>Behaviour</option>
              <option value={"Divorce"}>Divorce</option>
              <option value={"Child"}>Child</option>
              <option value={"Clinical"}>Clinical</option>
              <option value={"Cognitive"}>Cognitive</option>
              <option value={"Cognitive-Behavioral"}>
                Cognitive-Behavioral
              </option>
              <option value={"Eating-Disorder"}>Eating-Disorder</option>
              <option value={"Exercise"}>Exercise</option>
              <option value={"Youth"}>Youth</option>
              <option value={"SocialWork"}>SocialWork</option>
              <option value={"School"}>School</option>
              <option value={"Trauma"}>Trauma</option>
              <option value={"Nutritional"}>Nutritional</option>
              <option value={"Social"}>Social</option>
              <option value={"Dialect-Bheaviour"}>Dialect-Bheaviour</option>
              <option value={"Psychodynamic"}>Psychodynamic</option>
            </Select>
          </Box>

          <Box
            border={
              extraErrors.communicationType
                ? "1px solid red"
                : "1px solid black"
            }
            pos="relative"
            borderRadius="1.5rem"
            w="80%"
            margin={"auto"}
            marginBottom={"2rem"}
            padding="0.3em 2em 0.5em 0.5em"
          >
            <Text
              pos="absolute"
              fontSize={"0.8rem"}
              top={"-20px"}
              color={"red"}
            >
              {extraErrors.communicationType && (
                <Text color={"red"}>
                  Please Select Your Communication Medium
                </Text>
              )}
            </Text>
            <Text fontSize="1rem">
              What Communication Medium are you comfortable dealing with your
              patients?
            </Text>
            <Select
              padding="0"
              fontSize="0.9rem"
              focusBorderColor="transparent"
              border="none"
              onChange={(e) => {
                setTherapistDetails({
                  ...therapistDetails,
                  communicationType: e.target.value,
                });
              }}
            >
              <option value={""}>Select medium</option>

              <option value={"Physical"}>Physical</option>
              <option value={"Virtual"}>Virtual</option>
              <option value={"Any"}>Any</option>
            </Select>
          </Box>
          <Grid
            templateColumns={"1fr 1fr"}
            w="100%"
            margin={"auto"}
            rowGap="2rem"
            gap="1rem"
          >
            <Box
              border={errors.fullName ? "1px solid red" : "1px solid black"}
              pos="relative"
              borderRadius="1.5rem"
              w="100%"
              margin={"auto"}
              padding="0.3em 2em 0.5em 0.5em"
            >
              <Text
                pos="absolute"
                fontSize={"0.8rem"}
                top={"-20px"}
                color={"red"}
              >
                {errors.fullName && errors.fullName.message}
              </Text>
              <Text fontSize="1rem">Full Name</Text>
              <Input
                padding="0"
                fontSize="0.9rem"
                placeholder="Enter Full Name"
                focusBorderColor="transparent"
                border="none"
                {...register("fullName", {
                  required: "Please enter full name",
                })}
              ></Input>
            </Box>
            <Box
              border={errors.username ? "1px solid red" : "1px solid black"}
              pos="relative"
              borderRadius="1.5rem"
              w="100%"
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
                  required: "Please enter username",
                })}
              ></Input>
            </Box>
            <Box
              border={errors.password ? "1px solid red" : "1px solid black"}
              pos="relative"
              borderRadius="1.5rem"
              w="100%"
              margin={"auto"}
              padding="0.2em 2em 0.5em 0.5em"
            >
              <Text
                pos="absolute"
                fontSize={"0.8rem"}
                top={"-25px"}
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
                  required: "Enter Password",
                  minLength: {
                    value: 5,
                    message: "Password must be minimum of 5 length",
                  },
                })}
              ></Input>
            </Box>

            <Flex w="100%" margin={"auto"}>
              <Box
                border={errors.age ? "1px solid red" : "1px solid black"}
                pos="relative"
                borderRadius="1.5rem"
                w="40%"
                margin={"auto"}
                padding="0.3em 2em 0.5em 0.5em"
              >
                <Text
                  pos="absolute"
                  fontSize={"0.8rem"}
                  left={0}
                  top={"-25px"}
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
                    required: "Please select age",
                    min: {
                      value: 21,
                      message: "Age must be greater than 21",
                    },
                  })}
                ></Input>
              </Box>
              <Box
                border={errors.gender ? "1px solid red" : "1px solid black"}
                pos="relative"
                borderRadius="1.5rem"
                w="50%"
                margin={"auto"}
                padding="0.3em 2em 0.5em 0.5em"
              >
                <Text
                  pos="absolute"
                  fontSize={"0.8rem"}
                  top={"-25px"}
                  left={0}
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
                    required: "Please select gender",
                  })}
                >
                  <option value={""}>Select Gender</option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Other</option>
                </Select>
              </Box>
            </Flex>
            <Box
              border={errors.email ? "1px solid red" : "1px solid black"}
              pos="relative"
              borderRadius="1.5rem"
              w="100%"
              margin={"auto"}
              padding="0.3em 2em 0.5em 0.5em"
            >
              <Text
                pos="absolute"
                fontSize={"0.8rem"}
                top={"-25px"}
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
                  required: "Enter your email",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Enter a Valid Email ",
                  },
                })}
              ></Input>
            </Box>
            <Box
              border={errors.address ? "1px solid red" : "1px solid black"}
              pos="relative"
              borderRadius="1.5rem"
              w="100%"
              margin={"auto"}
              padding="0.3em 2em 0.5em 0.5em"
            >
              <Text
                pos="absolute"
                fontSize={"0.8rem"}
                top={"-25px"}
                color={"red"}
              >
                {errors.address && errors.address.message}
              </Text>
              <Text fontSize="1rem">Address</Text>
              <Input
                padding="0"
                fontSize="0.9rem"
                placeholder="Enter Address"
                focusBorderColor="transparent"
                border="none"
                {...register("address", {
                  required: "Please enter your address",
                })}
              ></Input>
            </Box>

            <Box
              border={errors.phoneno ? "1px solid red" : "1px solid black"}
              pos="relative"
              borderRadius="1.5rem"
              w="100%"
              margin={"auto"}
              padding="0.3em 2em 0.5em 0.5em"
            >
              <Text
                pos="absolute"
                fontSize={"0.8rem"}
                top={"-25px"}
                color={"red"}
              >
                {errors.phoneno && errors.phoneno.message}
              </Text>
              <Text fontSize="1rem">Phone No</Text>
              <Input
                padding="0"
                fontSize="0.9rem"
                placeholder="Enter Phone Number"
                focusBorderColor="transparent"
                border="none"
                type={"number"}
                {...register("phoneno", {
                  required: "Please enter your phone number",
                })}
              ></Input>
            </Box>
          </Grid>

          <FormControl marginTop="2rem" marginLeft={"2rem"}>
            <Checkbox
              colorScheme="green"
              isChecked={terms}
              onChange={(e) => {
                setTerms(!terms);
              }}
            >
              I have read the terms and conditions and agree them.
            </Checkbox>
            <Text mt={"1rem"}>
              {" "}
              By signing up and using our mental health website, you agree to
              abide by these terms and conditions and any applicable laws and
              regulations. Failure to comply with these terms and conditions may
              result in suspension or termination of your account and legal
              action where appropriate.
            </Text>
          </FormControl>
          {extraErrors.term && (
            <Text color={"red"}>
              Please agree to the terms and conditions before signing up
            </Text>
          )}
          <Button
            padding={"1.5rem 2rem"}
            marginTop="2rem"
            marginLeft={"1rem"}
            borderRadius="1.5em"
            bgColor={"#9fe7ab"}
            fontSize={"1.5rem"}
            color="white"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
