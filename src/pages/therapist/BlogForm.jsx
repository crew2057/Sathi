import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { post } from "../../services/middleware";
import { useNavigate } from "react-router-dom";
import { User } from "../../data/loggedin";

const BlogForm = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const { user } = useContext(User);
  const onSubmit = async (values) => {
    const res = await post("http://localhost:5000/blog/", {
      ...values,
      id: user.id,
    });
    if (res) {
      console.log(res);
      navigate("/blogs");
    }
  };
  return (
    <Box
      padding={"1rem"}
      display={"flex"}
      flexDir="column"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading>Add Blogs</Heading>
      <Box
        width={"70%"}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
        padding={"3rem"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <FormControl>
            <FormLabel>Title of Blog</FormLabel>
            <Input
              {...register("title", {
                required: "Please enter title",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Content of Blog</FormLabel>
            <Textarea
              {...register("content", {
                required: "Please enter content",
              })}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default BlogForm;
