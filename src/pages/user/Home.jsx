import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { User } from "../../data/loggedin";
import { get, post } from "../../services/middleware";
import { Rerecommend } from "./Rereco";
import Boy from "../../assets/boy.svg";
import girlGlass from "../../assets/AvatarsGlasses.svg";

const UserHome = () => {
  const { user, therapistAssigned, setTherapistAssigned } = useContext(User);
  const [therapist, setTherapist] = useState();
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
    if (val === "query" && therapist._id) {
      const res = await post("/user/assign", {
        therapistId: therapist._id,
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
  const getAssigned = useCallback(async () => {
    if (user.id && !recommend) {
      const res = await Promise.all([get(`/user/therapist/${user.id}`)]);
      if (res) {
        setTherapist(res[0].data);
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

                  {/* <UserCard data={therapist} /> */}
                  <Box
                    display={"flex"}
                    marginTop={"1rem"}
                    borderRadius="1rem"
                    padding="2rem"
                    boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
                  >
                    <Flex display={"column"}>
                      <Box>
                        {therapist?.gender === "male" ? (
                          <Image src={Boy} h="15rem" />
                        ) : (
                          <Image src={girlGlass} h="15rem" />
                        )}
                      </Box>
                      <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                        Name:{therapist?.fullName}
                      </Text>
                    </Flex>

                    <Box padding={"2rem"}>
                      <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                        Speciality:{therapist?.therapistDetails.speciality}
                      </Text>
                      <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                        User Name:{therapist?.username}
                      </Text>
                      <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                        Gender:{therapist?.gender}
                      </Text>
                      <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                        Age:{therapist?.age}
                      </Text>
                      <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                        Patients handled:{therapist?.usersAssigned.length}
                      </Text>
                    </Box>
                    <Button
                      colorScheme={"teal"}
                      alignSelf="end"
                      marginLeft="auto"
                      onClick={() => assign("query", 0)}
                    >
                      Proceed
                    </Button>
                  </Box>
                  {algoTherapist?.length > 0 && (
                    <Box>
                      <Heading>Similar therapists you can check</Heading>
                      {algoTherapist?.map((thera, index) => {
                        return (
                          <Box
                            display={"flex"}
                            marginTop={"1rem"}
                            borderRadius="1rem"
                            padding="2rem"
                            key={index}
                            boxShadow={
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "
                            }
                          >
                            <Flex display={"column"}>
                              <Box>
                                {thera?.gender === "male" ? (
                                  <Image src={Boy} h="10rem" />
                                ) : (
                                  <Image src={girlGlass} h="10rem" />
                                )}
                              </Box>
                              <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                                Name:{thera?.fullName}
                              </Text>
                            </Flex>

                            <Box padding={"2rem"}>
                              <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                                Speciality:
                                {thera?.therapistDetails.speciality}
                              </Text>
                              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                                User Name:{thera?.username}
                              </Text>
                              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                                Gender:{thera?.gender}
                              </Text>
                              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                                Age:{thera?.age}
                              </Text>
                              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                                Patients handled:{thera?.usersAssigned.length}
                              </Text>
                            </Box>
                            <Button
                              colorScheme={"teal"}
                              alignSelf="end"
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
            minH="50vh"
            maxH="70vh"
            padding="2rem"
            boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px "}
          >
            <Flex display={"column"} alignContent="center">
              <Box>
                {therapist?.gender === "male" ? (
                  <Image src={Boy} />
                ) : (
                  <Image src={girlGlass} />
                )}
              </Box>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Name:{therapist?.fullName}
              </Text>
            </Flex>
            <Box padding={"2rem"}>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Gender:{therapist?.gender}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Age:{therapist?.age}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Phone number:{therapist?.phoneno}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Mode of Communication:
                {therapist?.therapistDetails.communicationType}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Discription:{therapist?.communication}
              </Text>
            </Box>
          </Box>
          <Text>
            Your Saathi will contact you soon or you can contact them yourselves
            with the information provided above.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default UserHome;
