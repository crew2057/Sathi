import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { User } from "../../data/loggedin";
import { get, post } from "../../services/middleware";
import { Rerecommend } from "./Rereco";
import Boy from "../../assets/boy.svg";
import girlGlass from "../../assets/AvatarsGlasses.svg";

import { useQuery } from "@tanstack/react-query";
import BlogCard from "../therapist/BlogCard";
import { AiTwotoneStar } from "react-icons/ai";

const UserHome = () => {
  const { user, therapistAssigned, setTherapistAssigned } = useContext(User);
  const [therapist, setTherapist] = useState([]);
  const [algoTherapist, setAlgoTherapist] = useState([]);
  const [recommend, setRecommend] = useState(false);
  const [error, setErrorr] = useState({
    query: { message: "" },
    algo: { message: "" },
  });
  const init = useCallback(async () => {
    if (user.id) {
      try {
        const [algorithm] = await Promise.all([
          get(`/user/recommendByAlgo/${user.id}`).catch((err) => {
            setErrorr((e) => ({
              ...e,
              algo: { message: err.response.data.message },
            }));
          }),
        ]);
        if (algorithm.data) {
          setTherapist(algorithm.data.therapistToOurPreferences);
          setAlgoTherapist(algorithm.data.therapistFromSymptoms);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [user.id]);

  const assign = async (val, therap) => {
    if (val === "query") {
      const res = await post("/user/assign", {
        therapistId: therap._id,
        id: user.id,
      });
      if (res) {
        setTherapistAssigned(true);
      }
    }
    if (val === "algo") {
      const res = await post("/user/assign", {
        therapistId: therap._id,
        id: user.id,
      });
      if (res) {
        setTherapistAssigned(true);
      }
    }
  };
  const unassign = async () => {
    const res = await post("/user/unassign", {
      id: user.id,
    });
    if (res) {
      setTherapistAssigned(false);
    }
  };

  const getAssigned = useCallback(async () => {
    if (user.id && !recommend) {
      const res = await Promise.all([get(`/user/therapist/${user.id}`)]);
      if (res) {
        console.log(res);
        setTherapist([res[0].data]);
      }
    }
  }, [user.id, recommend]);

  useEffect(() => {
    if (!therapistAssigned && !recommend) {
      init();
    } else {
      getAssigned();
    }
  }, [init, therapistAssigned, recommend, getAssigned]);

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
  if (recommend) {
    return <Rerecommend recommend={recommend} setRecommend={setRecommend} />;
  }
  return (
    <Box
      w="100%"
      minH={"95vh"}
      bgPos={"center 300px"}
      bgSize="cover"
      bgRepeat={"no-repeat"}
      overflowY="hidden"
    >
      {!therapistAssigned ? (
        error.algo.message === "" || error.query.message === "" ? (
          <Box marginInline={"1rem"}>
            <Flex gap={"2rem"} w="100%">
              <Box
                borderRadius={"10px"}
                padding="1rem"
                display={"flex"}
                gap="2rem"
                w="80%"
                margin={"auto"}
                flexDirection={"column"}
                alignContent="center"
              >
                <>
                  <Heading>
                    Your{" "}
                    <Box as="span" color={"#7CC35B"}>
                      Saathi{" "}
                    </Box>
                    that we recommend you to your preferences
                  </Heading>
                  <Text>
                    These therapists are recommended to you on the basis of your
                    preferences that you mentioned.
                  </Text>
                  {/* <UserCard data={therapist} /> */}
                  {therapist?.length > 1 ? (
                    <Box
                      display={"flex"}
                      overflowX={"scroll"}
                      padding="3rem"
                      gap="2rem"
                      borderRadius={"1rem"}
                      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 5px "}
                    >
                      {therapist
                        ?.filter((ther) => {
                          return (
                            ther?.therapistDetails.speciality ===
                            user.therapistDetails.speciality
                          );
                        })
                        .map((spTher, index) => {
                          return (
                            <Box
                              key={spTher + index}
                              display={"flex"}
                              marginTop={"1rem"}
                              flexDirection={"column"}
                              borderRadius="1rem"
                              minW="fit-content"
                              gap={"1rem"}
                              padding="2rem"
                              pos={"relative"}
                              boxShadow={
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "
                              }
                            >
                              <Box
                                pos={"absolute"}
                                top={"-30px"}
                                display={"flex"}
                                alignItems={"center"}
                              >
                                <AiTwotoneStar size={"1.5rem"} fill="orange" />
                                <Text>
                                  This therapist is specialized in your prefered
                                  specialization.
                                </Text>
                              </Box>

                              <Flex minWidth="100px">
                                <Flex display={"column"}>
                                  <Box>
                                    {spTher?.gender === "male" ? (
                                      <Image src={Boy} h="15rem" />
                                    ) : (
                                      <Image src={girlGlass} h="15rem" />
                                    )}
                                  </Box>
                                  <Box fontSize={"1rem"}>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      {" "}
                                      Name:
                                    </Text>
                                    {spTher?.fullName}
                                  </Box>
                                </Flex>
                                <Flex
                                  display={"column"}
                                  gap="2rem"
                                  flexShrink={0}
                                  padding={"2rem"}
                                >
                                  <Box>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      {" "}
                                      Speciality:
                                    </Text>
                                    {spTher?.therapistDetails.speciality}
                                  </Box>
                                  <Box>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      {" "}
                                      Mode of Communication:{" "}
                                    </Text>
                                    {spTher?.therapistDetails.communicationType}
                                  </Box>
                                  <Box>
                                    {" "}
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Username:{" "}
                                    </Text>
                                    {spTher?.username}
                                  </Box>
                                  <Box>
                                    {" "}
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Gender:{" "}
                                    </Text>
                                    {spTher?.gender}
                                  </Box>
                                  <Box>
                                    {" "}
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Age:{" "}
                                    </Text>
                                    {spTher?.age}
                                  </Box>
                                  <Box>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Patients handled:{" "}
                                    </Text>
                                    {spTher?.usersAssigned.length}
                                  </Box>
                                </Flex>
                              </Flex>
                              <Button
                                colorScheme={"teal"}
                                alignSelf="end"
                                paddingInline={"2rem"}
                                marginLeft="auto"
                                onClick={() => assign("query", spTher)}
                              >
                                Proceed
                              </Button>
                            </Box>
                          );
                        })}

                      {therapist
                        ?.filter((ther) => {
                          return (
                            ther?.therapistDetails.speciality !==
                            user.therapistDetails.speciality
                          );
                        })
                        .map((ther, index) => {
                          return (
                            <Box
                              key={ther + index}
                              display={"flex"}
                              marginTop={"1rem"}
                              flexDirection={"column"}
                              borderRadius="1rem"
                              minW="fit-content"
                              gap={"1rem"}
                              padding="2rem"
                              pos={"relative"}
                              boxShadow={
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "
                              }
                            >
                              <Flex minWidth="100px">
                                <Flex display={"column"}>
                                  <Box>
                                    {ther?.gender === "male" ? (
                                      <Image src={Boy} h="15rem" />
                                    ) : (
                                      <Image src={girlGlass} h="15rem" />
                                    )}
                                  </Box>
                                  <Box fontSize={"1rem"}>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      {" "}
                                      Name:
                                    </Text>
                                    {ther?.fullName}
                                  </Box>
                                </Flex>
                                <Flex
                                  display={"column"}
                                  gap="2rem"
                                  flexShrink={0}
                                  padding={"2rem"}
                                >
                                  <Box>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      {" "}
                                      Speciality:
                                    </Text>
                                    {ther?.therapistDetails.speciality}
                                  </Box>
                                  <Box>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      {" "}
                                      Mode of Communication:{" "}
                                    </Text>
                                    {ther?.therapistDetails.communicationType}
                                  </Box>
                                  <Box>
                                    {" "}
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Username:{" "}
                                    </Text>
                                    {ther?.username}
                                  </Box>
                                  <Box>
                                    {" "}
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Gender:{" "}
                                    </Text>
                                    {ther?.gender}
                                  </Box>
                                  <Box>
                                    {" "}
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Age:{" "}
                                    </Text>
                                    {ther?.age}
                                  </Box>
                                  <Box>
                                    <Text fontWeight={"bold"} as={"span"}>
                                      Patients handled:{" "}
                                    </Text>
                                    {ther?.usersAssigned.length}
                                  </Box>
                                </Flex>
                              </Flex>
                              <Button
                                colorScheme={"teal"}
                                alignSelf="end"
                                paddingInline={"2rem"}
                                marginLeft="auto"
                                onClick={() => assign("query", ther)}
                              >
                                Proceed
                              </Button>
                            </Box>
                          );
                        })}
                    </Box>
                  ) : therapist.length === 1 ? (
                    <Box
                      display={"flex"}
                      marginTop={"1rem"}
                      flexDirection={"column"}
                      borderRadius="1rem"
                      minW="fit-content"
                      padding="2rem"
                      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
                    >
                      {therapist[0]?.therapistDetails.speciality ===
                        user.therapistDetails.speciality && (
                        <Box display={"flex"} alignItems={"center"}>
                          <AiTwotoneStar size={"1.5rem"} fill="orange" />
                          <Text>
                            This therapist is specialized in your prefered
                            specialization.
                          </Text>
                        </Box>
                      )}
                      <Flex minWidth="100px">
                        <Flex display={"column"}>
                          <Box>
                            {therapist[0]?.gender === "male" ? (
                              <Image src={Boy} h="15rem" />
                            ) : (
                              <Image src={girlGlass} h="15rem" />
                            )}
                          </Box>
                          <Box fontSize={"1rem"}>
                            <Text fontWeight={"bold"} as={"span"}>
                              {" "}
                              Name:
                            </Text>
                            {therapist[0]?.fullName}
                          </Box>
                        </Flex>
                        <Flex
                          display={"column"}
                          gap="2rem"
                          flexShrink={0}
                          padding={"2rem"}
                        >
                          <Box>
                            <Text fontWeight={"bold"} as={"span"}>
                              {" "}
                              Speciality:
                            </Text>
                            {therapist[0]?.therapistDetails.speciality}
                          </Box>
                          <Box>
                            <Text fontWeight={"bold"} as={"span"}>
                              {" "}
                              Mode of Communication:{" "}
                            </Text>
                            {therapist[0]?.therapistDetails.communicationType}
                          </Box>
                          <Box>
                            {" "}
                            <Text fontWeight={"bold"} as={"span"}>
                              Username:{" "}
                            </Text>
                            {therapist[0]?.username}
                          </Box>
                          <Box>
                            {" "}
                            <Text fontWeight={"bold"} as={"span"}>
                              Gender:{" "}
                            </Text>
                            {therapist[0]?.gender}
                          </Box>
                          <Box>
                            {" "}
                            <Text fontWeight={"bold"} as={"span"}>
                              Age:{" "}
                            </Text>
                            {therapist[0]?.age}
                          </Box>
                          <Box>
                            <Text fontWeight={"bold"} as={"span"}>
                              Patients handled:{" "}
                            </Text>
                            {therapist[0]?.usersAssigned.length}
                          </Box>
                        </Flex>
                      </Flex>
                      <Button
                        colorScheme={"teal"}
                        alignSelf="end"
                        paddingInline={"2rem"}
                        marginLeft="auto"
                        onClick={() => assign("query", therapist[0])}
                      >
                        Proceed
                      </Button>
                    </Box>
                  ) : null}

                  {algoTherapist?.length > 0 && (
                    <Box>
                      <Heading>Similar therapists you can check</Heading>
                      <Text>
                        These therapists are recommended to you on the basis of
                        the symptoms that you have mentioned such that they are
                        right between your needs of preferences and your
                        symptoms .
                      </Text>
                      {algoTherapist?.map((thera, index) => {
                        return (
                          <Box
                            display={"flex"}
                            key={thera + index}
                            marginTop={"1rem"}
                            flexDirection={"column"}
                            borderRadius="1rem"
                            minW="fit-content"
                            padding="2rem"
                            boxShadow={
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "
                            }
                          >
                            {thera?.therapistDetails.speciality ===
                              user.therapistDetails.speciality && (
                              <Box display={"flex"} alignItems={"center"}>
                                <AiTwotoneStar size={"1.5rem"} fill="orange" />
                                <Text>
                                  This therapist is specialized in your prefered
                                  specialization.
                                </Text>
                              </Box>
                            )}
                            <Flex minWidth="100px">
                              <Flex display={"column"}>
                                <Box>
                                  {thera?.gender === "male" ? (
                                    <Image src={Boy} h="15rem" />
                                  ) : (
                                    <Image src={girlGlass} h="15rem" />
                                  )}
                                </Box>
                                <Box fontSize={"1rem"}>
                                  <Text fontWeight={"bold"} as={"span"}>
                                    {" "}
                                    Name:
                                  </Text>
                                  {thera?.fullName}
                                </Box>
                              </Flex>
                              <Flex
                                display={"column"}
                                gap="2rem"
                                flexShrink={0}
                                padding={"2rem"}
                              >
                                <Box>
                                  <Text fontWeight={"bold"} as={"span"}>
                                    {" "}
                                    Speciality:
                                  </Text>
                                  {thera?.therapistDetails.speciality}
                                </Box>
                                <Box>
                                  <Text fontWeight={"bold"} as={"span"}>
                                    {" "}
                                    Mode of Communication:{" "}
                                  </Text>
                                  {thera?.therapistDetails.communicationType}
                                </Box>
                                <Box>
                                  {" "}
                                  <Text fontWeight={"bold"} as={"span"}>
                                    Username:{" "}
                                  </Text>
                                  {thera?.username}
                                </Box>
                                <Box>
                                  {" "}
                                  <Text fontWeight={"bold"} as={"span"}>
                                    Gender:{" "}
                                  </Text>
                                  {thera?.gender}
                                </Box>
                                <Box>
                                  {" "}
                                  <Text fontWeight={"bold"} as={"span"}>
                                    Age:{" "}
                                  </Text>
                                  {thera?.age}
                                </Box>
                                <Box>
                                  <Text fontWeight={"bold"} as={"span"}>
                                    Patients handled:{" "}
                                  </Text>
                                  {thera?.usersAssigned.length}
                                </Box>
                              </Flex>
                            </Flex>
                            <Button
                              colorScheme={"teal"}
                              alignSelf="end"
                              paddingInline={"2rem"}
                              marginLeft="auto"
                              onClick={() => assign("algo", thera)}
                            >
                              Proceed
                            </Button>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                  <Text fontWeight={"bold"}>
                    Do you not like the therapist recommended to you and want to
                    change your preferences?
                  </Text>
                  <Text>
                    Please click the button below to so we can redirect you to
                    preference selection such that we can recommend you another
                    therapist.
                  </Text>
                  <Button
                    colorScheme={"orange"}
                    w="30%"
                    onClick={() => {
                      setRecommend(true);
                    }}
                  >
                    re-recommend
                  </Button>
                </>
              </Box>
            </Flex>
          </Box>
        ) : (
          <Box>
            <Heading>{error.algo.message}</Heading>
            <Button
              onClick={() => {
                setRecommend(true);
                setErrorr({ query: { message: "" }, algo: { message: "" } });
              }}
            >
              re-recommend
            </Button>
          </Box>
        )
      ) : (
        <Box w={"80%"} margin="auto" marginTop={"2rem"}>
          <Heading>
            Your{" "}
            <Box as="span" color={"#7CC35B"}>
              Saathi
            </Box>{" "}
            to help guide you through your problems
          </Heading>
          <Box
            display={"flex"}
            marginTop={"1rem"}
            borderRadius="1rem"
            maxH="70vh"
            padding="2rem"
            paddingBottom={"5rem"}
            boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
          >
            <Flex display={"column"} alignContent="center">
              <Box>
                {therapist[0]?.gender === "male" ? (
                  <Image src={Boy} />
                ) : (
                  <Image src={girlGlass} />
                )}
              </Box>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Name:{therapist[0]?.fullName}
              </Text>
            </Flex>
            <Flex flexDirection={"column"} gap={"2rem"} padding={"2rem"}>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Speciality:{therapist[0]?.therapistDetails.speciality}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Mode of Communication:
                {therapist[0]?.therapistDetails.communicationType}
              </Text>

              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Patients handled:{therapist[0]?.usersAssigned.length}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Gender:{therapist[0]?.gender}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Age:{therapist[0]?.age}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Phone number:{therapist[0]?.phoneno}
              </Text>
            </Flex>
          </Box>
          <Text>
            Your Saathi will contact you soon or you can contact them yourselves
            with the information provided above.
          </Text>
          <Text marginTop={"1rem"}>
            Dont like the therapist and want to reassign a therapist to
            yourself?
          </Text>
          <Button colorScheme="orange" onClick={unassign}>
            re-assign
          </Button>
          {blogQuery?.data.response.length > 0 && (
            <Box marginTop={"2rem"} padding={"2rem"}>
              <Heading>
                Blogs from our therapists you can discover in the meanwhile
              </Heading>
              {blogQuery?.data.response.map((blog) => {
                return (
                  <BlogCard
                    id={blog.blog._id}
                    key={blog.blog._id}
                    title={blog.blog.title}
                    blogQuery={blogQuery}
                    content={blog.blog.content}
                    likes={blog.blog.likes}
                    createdBy={blog.user.username}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserHome;
