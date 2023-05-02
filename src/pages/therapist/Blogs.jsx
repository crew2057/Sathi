import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import BlogForm from "./BlogForm";
import { useNavigate } from "react-router-dom";
import { get } from "../../services/middleware";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";

const TherapistBlogs = () => {
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();
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
          <Heading>Blogs:</Heading>
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
      <Box>
        {blogQuery?.data.response.map((blog) => {
          return (
            <BlogCard
              id={blog.blog._id}
              title={blog.blog.title}
              content={blog.blog.content}
              likes={blog.blog.likes}
              createdBy={blog.user.username}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TherapistBlogs;
