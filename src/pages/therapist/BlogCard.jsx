import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { put } from "../../services/middleware";
import { User } from "../../data/loggedin";

const BlogCard = ({ id, title, content, likes, createdBy }) => {
  const [liked, setLiked] = useState("notliked");
  const [newLikes, setNewLikes] = useState(likes);
  const { user } = useContext(User);

  useEffect(() => {
    user.likedBlogs.forEach((blog) => {
      if (blog === id) {
        setLiked("onload");
      }
    });
  }, [id, user.likedBlogs]);

  const handleLike = async () => {
    switch (liked) {
      case "onload":
        setNewLikes(likes - 1);
        break;
      case "liked":
        setNewLikes((newlike) => newlike - 1);
        break;
      case "unliked":
        setNewLikes(likes);
        break;
      case "notliked":
        setNewLikes(likes + 1);
        break;
      default:
        break;
    }

    const res = await put("/blog/likes", {
      id: id,
      type: liked === "onload" || liked === "liked" ? "decrement" : "increment",
      user: user.id,
    });
    if (res) {
      setLiked((like) =>
        like === "onload"
          ? "unliked"
          : like === "liked"
          ? "notliked"
          : like === "notliked"
          ? "liked"
          : "onload"
      );

      console.log(res);
    }
  };

  return (
    <Box
      padding={"2rem"}
      display={"flex"}
      flexDir={"column"}
      gap={"1rem"}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
      marginTop={"2rem"}
      borderRadius={"10px"}
    >
      <Heading fontSize={"2rem"}>Title:{title}</Heading>
      <Text fontSize={"1.2rem"}>{content}</Text>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"start"}
        onClick={handleLike}
      >
        <span
          style={{
            cursor: "pointer",
          }}
        >
          {liked === "onload" || liked === "liked" ? (
            <FcLike fontSize={"2rem"} />
          ) : (
            <FcLikePlaceholder fontSize={"2rem"} />
          )}
        </span>

        <Box as="span">{newLikes} Likes</Box>
      </Box>
      <Box>
        <Heading fontSize={"1rem"}>CreatedBy:{createdBy}</Heading>
      </Box>
    </Box>
  );
};

export default BlogCard;
