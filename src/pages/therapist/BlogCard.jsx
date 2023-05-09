import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineDelete } from "react-icons/md";
import { del, put } from "../../services/middleware";
import { User } from "../../data/loggedin";

const BlogCard = ({
  id,
  title,
  content,
  likes,
  createdBy,
  remove,
  blogQuery,
}) => {
  const [liked, setLiked] = useState("notliked");

  const [view, setView] = useState(false);
  const [newLikes, setNewLikes] = useState(likes);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(User);
  const toast = useToast();
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
        setNewLikes((newLike) => newLike - 1);
        break;
      case "unliked":
        setNewLikes(likes + 1);
        break;
      case "notliked":
        setNewLikes((newLike) => newLike + 1);
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
      setLiked((like) => {
        switch (like) {
          case "onload":
            return "unliked";
          case "unliked":
            return "onload";
          case "liked":
            return "notliked";
          case "notliked":
            return "liked";
          default:
            return;
        }
      });
      blogQuery.refetch();
    }
  };
  const handleDelete = async () => {
    const res = await del(`/blog/${id}`);
    if (res) {
      onClose();
      blogQuery.refetch();
      toast({
        title: "Blog Deleted",
        description: "We've Deleted your Blog for you.",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
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
      pos={"relative"}
      borderRadius={"40px"}
    >
      <Heading fontSize={"2rem"}>{title}</Heading>
      <Text fontSize={"1.2rem"}>
        {view
          ? content
          : content.length > 40
          ? content.slice(0, 40) + "..."
          : content}
      </Text>
      <Text
        _hover={{
          color: "green.200",
        }}
        fontWeight={"bold"}
        cursor={"pointer"}
        onClick={() => setView(!view)}
      >
        {content.length > 40 && <>View {!view ? "more" : "less"}</>}
      </Text>
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
      {remove && (
        <MdOutlineDelete
          onClick={onOpen}
          style={{
            position: "absolute",
            top: "10px",
            right: "30px",
            cursor: "pointer",
          }}
          size={"2rem"}
        />
      )}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Blog?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Are you sure you want to delete your blog?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BlogCard;
