import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { get } from "../../services/middleware";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import { User } from "../../data/loggedin";

const TherapistBlogs = () => {
  const [blogs, setBlogs] = useState("All");
  const navigate = useNavigate();
  const { user } = useContext(User);
  const fetch = async () => {
    const res = await get(`/blog/`);
    return res.data;
  };
  const blogQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetch(),
  });

  if (blogQuery.isLoading) return <Box>Loading....</Box>;
  if (blogQuery.isError) return <Box>Error</Box>;
  return (
    <Box padding={"1rem"}>
      <Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap="2rem"
          >
            <Heading>Blogs:</Heading>
            <Button
              variant={"outline"}
              bgColor={blogs === "All" && "#9fe7ab"}
              color={blogs === "All" && "white"}
              onClick={() => setBlogs("All")}
            >
              All Blogs
            </Button>
            <Button
              variant={"outline"}
              bgColor={blogs === "Self" && "#9fe7ab"}
              color={blogs === "Self" && "white"}
              onClick={() => setBlogs("Self")}
            >
              Your Blogs
            </Button>
          </Flex>

          <Button
            outline="2px solid black"
            variant={"outline"}
            onClick={() => navigate("/blogs/add")}
          >
            Post a Blog
          </Button>
        </Box>
        <Box as="span">
          A place to write your blogs for mental positivity to help people in
          need
        </Box>
      </Box>
      <Box w={"90%"} margin="auto">
        {blogs === "All"
          ? blogQuery?.data.response.map((blog) => {
              return (
                <BlogCard
                  id={blog.blog._id}
                  title={blog.blog.title}
                  remove={false}
                  content={blog.blog.content}
                  likes={blog.blog.likes}
                  createdBy={blog.user.username}
                />
              );
            })
          : blogQuery?.data.response
              .filter((blog) => {
                return blog.user._id === user.id;
              })
              .map((blg) => {
                return (
                  <BlogCard
                    id={blg.blog._id}
                    blogQuery={blogQuery}
                    remove={true}
                    title={blg.blog.title}
                    content={blg.blog.content}
                    likes={blg.blog.likes}
                    createdBy={blg.user.username}
                  />
                );
              })}
      </Box>
    </Box>
  );
};

export default TherapistBlogs;
