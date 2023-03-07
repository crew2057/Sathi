import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { User } from "../../data/loggedin";
import { get, post } from "../../services/middleware";
import { Rerecommend } from "./Rereco";

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
      <Box marginTop={"10rem"}>
        <Heading marginLeft={"10rem"}>Re-Recommend Therapist</Heading>
        <Rerecommend recommend={recommend} setRecommend={setRecommend} />
      </Box>
    );
  }
  return (
    <div>
      {!therapistAssigned ? (
        error.algo.message === "" || error.query.message === "" ? (
          <Box marginTop={"10rem"} marginInline="5rem">
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
                    <Heading marginTop={"10rem"}>{error.query.message}</Heading>
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
                    <Heading marginTop={"10rem"}>{error.algo.message}</Heading>
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
            <Heading marginTop={"10rem"}>{error}</Heading>
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
        <Box marginTop={"10rem"} marginLeft={"10rem"}>
          <Heading>Therapist assigned</Heading>
          <Text fontWeight={"bold"}>Name:{therapist?.fullName}</Text>
          <Text fontWeight={"bold"}>Gender:{therapist?.gender}</Text>
          <Text fontWeight={"bold"}>Age:{therapist?.age}</Text>
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
