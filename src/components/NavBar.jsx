import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../data/loggedin";
import { logOut } from "../services/auth";
import "./navbar.css";
const NavBar = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(User);
  const location = useLocation();

  const nav = useRef(null);

  useEffect(() => {
    const event = (e) => {
      if (window.scrollY !== 0) {
        nav.current.style.position = "fixed";
        nav.current.style.backgroundColor = "#e6ffcc";
      }
      if (window.scrollY === 0) {
        nav.current.style.position = "";
        nav.current.style.backgroundColor = "";
      }
    };
    if (nav !== null) {
      window.addEventListener("scroll", event);
    }
    return () => window.removeEventListener("scroll", event);
  }, [nav]);
  return (
    <Box ref={nav} id="nav" w="100vw" zIndex={100} bg="white ">
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
                onClick={() => {
                  navigate("/");
                  if (location.pathname === "/")
                    ref.current.scrollIntoView({ behavior: "smooth" });
                }}
                cursor={"pointer"}
              >
                FAQS
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
          ) : user.role === "therapist" ? (
            <>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    navigate("/blogs");
                  }}
                  outline="2px solid black"
                  variant={"outline"}
                >
                  Blogs
                </Button>
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
          ) : (
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
          )}
        </List>
      </Flex>
    </Box>
  );
});

export default NavBar;
