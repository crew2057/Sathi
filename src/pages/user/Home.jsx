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
  const { user, therapistAssigned } = useContext(User);
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
        setAlgoTherapist(algorithm.data.bestTherapist);
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

  const assign = async () => {
    if (therapist._id) {
      const res = await post("/user/assign", {
        therapistId: therapist._id,
        id: user.id,
      });
      if (res) {
        console.log(res);
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
    return (
      <Box>
        <Heading>Re-Recommend Therapist</Heading>
        <Rerecommend recommend={recommend} setRecommend={setRecommend} />
      </Box>
    );
  }
  return (
    <div>
      {!therapistAssigned ? (
        error.algo.message === "" || error.query.message === "" ? (
          <Box marginInline="5rem">
            <Flex gap={"2rem"} marginBottom={"5rem"}>
              <Box
                border={"5px green solid"}
                borderRadius={"10px"}
                padding="1rem"
                display={"flex"}
                gap="2rem"
                flexDirection={"column"}
                alignContent="center"
              >
                {error.query.message === "" ? (
                  <>
                    <Heading>
                      Therapist recommended from Query Based Approach{" "}
                    </Heading>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Name:{therapist?.fullName}
                    </Text>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Gender:{therapist?.gender}
                    </Text>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Age:{therapist?.age}
                    </Text>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Speciality:{therapist?.therapistDetails.speciality}
                    </Text>

                    <Button onClick={assign}>Proceed</Button>
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
              {/* <Box
                border={"5px black solid"}
                borderRadius={"10px"}
                padding="1rem"
                display={"flex"}
                gap="2rem"
                flexDirection={"column"}
                alignContent="center"
              >
                {error.algo.message === "" ? (
                  <>
                    <Heading>
                      Therapist recommended from Content Based Filtering
                      Algorithm
                    </Heading>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Name:{algoTherapist?.fullName}
                    </Text>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Gender:{algoTherapist?.gender}
                    </Text>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Age:{algoTherapist?.age}
                    </Text>
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      Speciality:{algoTherapist?.therapistDetails.speciality}
                    </Text>

                    <Button onClick={assign}>Proceed</Button>
                  </>
                ) : (
                  <Box>
                    <Heading >{error.algo.message}</Heading>
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
              </Box> */}
            </Flex>
            <Button
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
                Phone number:{therapist?.age}
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
