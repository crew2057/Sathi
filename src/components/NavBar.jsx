import React, { useContext, useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "../data/loggedin";
import { logOut } from "../services/auth";

const NavBar = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(User);
  const location = useLocation();
  return (
    <Box pos={"fixed"} w="100vw" zIndex={100} bg="white ">
      <Flex justifyContent={"space-between"} padding="1rem">
        <Heading
          cursor={"pointer"}
          onClick={() => {
            navigate("/");
          }}
        >
          Saathi
        </Heading>
        <List
          display={"flex"}
          gap="1rem"
          alignItems={"center"}
          fontSize="1.4rem"
          fontWeight="bold"
        >
          {user.role === "" ? (
            <>
              <ListItem
                cursor={"pointer"}
                onClick={() => {
                  navigate("/contactus");
                }}
              >
                Contact Us
              </ListItem>
              <ListItem
                cursor={"pointer"}
                onClick={() => {
                  navigate("/blogs");
                }}
              >
                Blogs
              </ListItem>
              <ListItem
                onClick={() => {
                  navigate("/");
                  if (location.pathname === "/")
                    ref.current.scrollIntoView({ behavior: "smooth" });
                }}
                cursor={"pointer"}
              >
                FAQS
              </ListItem>
              <ListItem
                cursor={"pointer"}
                onClick={() => {
                  navigate("/aboutus");
                }}
              >
                About Us
              </ListItem>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  outline="2px solid black"
                  variant={"outline"}
                >
                  Login
                </Button>
                <Button
                  bgColor={"#9FE7AB"}
                  onClick={() => {
                    navigate("/query");
                  }}
                  color="white"
                >
                  Get Started
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <ListItem
                cursor={"pointer"}
                onClick={() => {
                  navigate("/blogs");
                }}
              >
                Blogs
              </ListItem>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    logOut();
                    setUser("");
                  }}
                  outline="2px solid black"
                  variant={"outline"}
                >
                  LogOut
                </Button>
              </ButtonGroup>
            </>
          )}
        </List>
      </Flex>
    </Box>
  );
});

export default NavBar;
