import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { User } from "../../data/loggedin";
import { get, post } from "../../services/middleware";
import { Rerecommend } from "./Rereco";
import Boy from "../../assets/boy.svg";
import girlGlass from "../../assets/AvatarsGlasses.svg";
import UserCard from "../../components/user";
const UserHome = () => {
  const { user, therapistAssigned, setTherapistAssigned } = useContext(User);
  const [therapist, setTherapist] = useState();
  const [algoTherapist, setAlgoTherapist] = useState();
  const [recommend, setRecommend] = useState(false);
  const [error, setErrorr] = useState({
    query: { message: "" },
    algo: { message: "" },
  });
  const init = useCallback(async () => {
    if (user.id) {
      const [query, algorithm] = await Promise.all([
        get(`/user/recommend/${user.id}`).catch((err) => {
          setErrorr((e) => ({
            ...e,
            query: { message: err.response.data.message },
          }));
        }),
        get(`/user/recommendByAlgo/${user.id}`).catch((err) => {
          setErrorr((e) => ({
            ...e,
            algo: { message: err.response.data.message },
          }));
        }),
      ]);

      if (query) {
        setTherapist(query.data.recommendedTherapist);
      }
      if (algorithm) {
        console.log(algorithm.data);
        setAlgoTherapist(algorithm.data.therapistFromSymptoms);
      }

      // if (algorithm.status !== 200) {
      //   setErrorr({
      //     message: algorithm.data.message,
      //     origin: "algorithm",
      //   });
      // } else {
      //   setErrorr({
      //     message: query.data.message,
      //     origin: "query",
      //   });
      // }
    }
  }, [user.id]);

  const assign = async (val) => {
    if (val === "query" && therapist._id) {
      const res = await post("/user/assign", {
        therapistId: therapist._id,
        id: user.id,
      });
      if (res) {
        setTherapistAssigned(true);
      }
    }
    if (val === "algo" && algoTherapist._id) {
      const res = await post("/user/assign", {
        therapistId: algoTherapist._id,
        id: user.id,
      });
      if (res) {
        setTherapistAssigned(true);
      }
    }
  };
  const getAssigned = useCallback(async () => {
    if (user.id) {
      const res = await Promise.all([get(`/user/therapist/${user.id}`)]);
      if (res) {
        setTherapist(res[0].data);
      }
    }
  }, [user.id]);

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
    <div>
      {!therapistAssigned ? (
        error.algo.message === "" || error.query.message === "" ? (
          <Box marginInline={"1rem"}>
            <Flex gap={"2rem"}>
              <Box
                border={"5px black solid"}
                borderRadius={"10px"}
                padding="1rem"
                display={"flex"}
                gap="2rem"
                w={"50%"}
                flexDirection={"column"}
                alignContent="center"
              >
                {error.query.message === "" ? (
                  <>
                    <Heading>
                      Your{" "}
                      <Box as="span" color={"#7CC35B"}>
                        Saathi{" "}
                      </Box>
                      that we recommend you to your preferences
                    </Heading>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Name:{therapist?.fullName}
                    </Text>

                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Speciality:{therapist?.therapistDetails.speciality}
                    </Text>
                    <UserCard data={therapist} />

                    <Button onClick={() => assign("query")}>Proceed</Button>
                  </>
                ) : (
                  <Box>
                    <Heading>{error.query.message}</Heading>
                    <Button
                      onClick={() => {
                        setRecommend(true);
                        setErrorr({
                          query: { message: "" },
                          algo: { message: "" },
                        });
                      }}
                    >
                      re-recommend
                    </Button>
                  </Box>
                )}
              </Box>
              <Box
                border={"5px black solid"}
                borderRadius={"10px"}
                padding="1rem"
                w={"50%"}
                display={"flex"}
                gap="2rem"
                flexDirection={"column"}
                alignContent="center"
              >
                {error.algo.message === "" ? (
                  <>
                    <Heading>
                      Your{" "}
                      <Box as="span" color={"#7CC35B"}>
                        Saathi
                      </Box>{" "}
                      we recommend you to your preferences and similar{" "}
                      <Box as="span" color={"#7CC35B"}>
                        Saathi's
                      </Box>
                    </Heading>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Name:{algoTherapist?.fullName}
                    </Text>

                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Speciality:{algoTherapist?.therapistDetails.speciality}
                    </Text>
                    <UserCard data={algoTherapist} />
                    <Button onClick={() => assign("algo")}>Proceed</Button>
                  </>
                ) : (
                  <Box>
                    <Heading>{error.algo.message}</Heading>
                    <Button
                      onClick={() => {
                        setRecommend(true);
                        setErrorr({
                          query: { message: "" },
                          algo: { message: "" },
                        });
                      }}
                    >
                      re-recommend
                    </Button>
                  </Box>
                )}
              </Box>
            </Flex>
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
              colorScheme={"teal"}
              onClick={() => {
                setRecommend(true);
              }}
            >
              re-recommend
            </Button>
          </Box>
        ) : (
          <Box>
            <Heading>{error}</Heading>
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
                Mode of Communication:{therapist?.communication}
              </Text>
              <Text fontSize={"1.3rem"} fontWeight={"bold"}>
                Discription:{therapist?.communication}
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );

  // return (
  //   <div>
  //     {!therapistAssigned ? (
  //       <>
  //         {!recommend ? (
  //           <Box>
  //             <Heading paddingTop={"10rem"}>Recommended Therapist</Heading>
  //             <Text fontSize={"1.5rem"}>
  //               The therapist recommended for you :
  //             </Text>
  //             <Text fontWeight={"bold"}>Name:{therapist.fullName}</Text>
  //             <Text fontWeight={"bold"}>Gender:{therapist.gender}</Text>
  //             <Text fontWeight={"bold"}>Age:{therapist.age}</Text>

  //             <Button>re-recommend</Button>
  //             <Button onClick={assign}>Proceed</Button>
  //           </Box>
  //         ) : (
  //           <Box>
  //             <Heading paddingTop={"10rem"}>Re-Recommend Therapist</Heading>
  //             <Rerecommend />
  //           </Box>
  //         )}
  //       </>
  //     ) : (
  //       <Box paddingTop={"10rem"}>
  //         <Heading>Therapist assigned</Heading>
  //         <Text fontWeight={"bold"}>Name:{therapist?.fullName}</Text>
  //         <Text fontWeight={"bold"}>Gender:{therapist?.gender}</Text>
  //         <Text fontWeight={"bold"}>Age:{therapist?.age}</Text>
  //       </Box>
  //     )}
  //   </div>
  // );
};

export default UserHome;
