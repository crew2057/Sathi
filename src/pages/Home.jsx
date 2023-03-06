import {
  Box,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import HomeGreen from "../assets/HomeGreen.svg";
import Boy from "../assets/boy.svg";
import girlGlass from "../assets/AvatarsGlasses.svg";
import girlDoc from "../assets/LifesaversAvatar.svg";
import orange1 from "../assets/orangecurve1.svg";
import orange2 from "../assets/orangecurve2.svg";
import orange3 from "../assets/orange3.svg";
import chatting from "../assets/chatting.svg";
import sittingchat from "../assets/sittingchatting.svg";
import phone from "../assets/phone.svg";
import CroodSitting from "../assets/CroodsSitting.svg";
import CroodStanding from "../assets/CroodsStanding.svg";
import Footer1 from "../assets/footer1.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Auth } from "../data/auth";
const AccordionComp = (props) => {
  return (
    <AccordionItem padding={"0.5rem"}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" fontSize={"1.75rem"} textAlign="left">
            {props.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} fontSize={"1.5rem"}>
        {props.content}
      </AccordionPanel>
    </AccordionItem>
  );
};

const Home = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  return (
    <Box>
      {" "}
      {/* section 1 */}
      <Box
        display={"flex"}
        alignItems="center"
        flexDirection={"column"}
        gap="1rem"
        h="90vh"
        bgImage={HomeGreen}
        justifyContent={"center"}
        w="100%"
        bgPos={"center 300px "}
        bgSize="cover"
        bgRepeat={"no-repeat"}
      >
        <Heading fontSize={"6rem"}>A PLACE FOR HEALING</Heading>
        <Heading>Looking for Therapy?</Heading>
        <Button
          bgColor={"#85d492"}
          boxShadow={"rgba(100, 100, 111, 0.5) 0px 10px 30px 0px "}
          color="white"
          onClick={() => {
            navigate("/query");
          }}
          fontSize={"2rem"}
          padding={"2rem 3rem"}
        >
          Discover
        </Button>
      </Box>
      {/* section 2 */}
      <Flex
        h={"95vh"}
        w="100vw"
        bgColor={"#F3F3C7"}
        position="relative"
        bg="rgb(212,245,182)
        
     linear-gradient(193deg, rgba(212,245,182,1) 0%, rgba(243,243,199,1) 67%) "
        _after={{
          content: '""',
          position: "absolute",
          bottom: "-50px",
          zIndex: "1",
          width: "100%",
          bgImage: `url(${orange1})`,
          height: "40vh",
          bgPosition: "bottom  ",
          bgSize: "cover",
          bgRepeat: "no-repeat",
        }}
      >
        <Box w={"40%"} position="relative">
          <Image
            position={"absolute"}
            top="10vh"
            left={"10vw"}
            src={Boy}
          ></Image>
          <Image
            position={"absolute"}
            top="30vh"
            left={"10vw"}
            src={girlGlass}
          ></Image>
          <Image
            position={"absolute"}
            top="23vh"
            left={"20vw"}
            src={girlDoc}
          ></Image>
        </Box>

        <Box w={"50%"} h="100%" padding="1rem" zIndex={"2"}>
          <Flex flexDirection={"column"} marginTop="30%" gap={"1rem"}>
            <Heading fontSize={"4rem"}>
              Professional Therapists whom you can trust.{" "}
            </Heading>
            <Text fontSize={"1.5rem"}>
              Team of experienced therapists is trained in a variety of
              approaches, including cognitive-behavioral therapy, psychoanalytic
              therapy, and mindfulness-based therapy, and we are committed to
              helping our clients achieve their therapeutic goals.
            </Text>
            <Button color={"white"} w={"15%"} bgColor="#9FE7AB">
              {" "}
              Get Started{" "}
            </Button>
          </Flex>
        </Box>
      </Flex>
      {/* Section 3 */}
      <Box h={"200vh"} w="100vw" position={"relative"}>
        <Box
          h={"160vh"}
          w="100vw"
          bgSize="100vw"
          bgRepeat={"no-repeat"}
          bgColor="#81E2A8"
          position={"relative"}
          zIndex={"-1"}
          _before={{
            content: '""',
            position: "absolute",
            top: "-20px",
            zIndex: "-1",
            width: "100%",
            bgImage: `url(${orange2})`,
            height: "40vh",
            bgPosition: "top",
            bgSize: "cover",
            bgRepeat: "no-repeat",
          }}
          _after={{
            content: '""',
            position: "absolute",

            bottom: "-20px",
            zIndex: "-1",
            width: "100%",
            bgImage: `url(${orange3})`,
            height: "40vh",
            bgPosition: "bottom center ",
            bgSize: "cover",
            bgRepeat: "no-repeat",
          }}
        >
          <Box h={"20vh"}></Box>
          <Heading
            textAlign={"center"}
            color="white"
            textDecoration={"underline"}
            fontSize="5rem"
          >
            {" "}
            Features{" "}
          </Heading>
          <Grid
            w="75%"
            margin={"auto"}
            gridTemplateColumns={"1fr 1fr"}
            zIndex={"3"}
            gridTemplateRows="1fr 1fr"
          >
            <GridItem>
              <Image src={chatting} />
            </GridItem>
            <GridItem paddingBlock={"8rem"}>
              <Heading>
                Get Therapists recommended to your choices and needs
              </Heading>
              <Text fontSize={"1.5rem"}>
                {" "}
                Team of experienced therapists is trained in a variety of
                approaches, including cognitive-behavioral therapy,
                psychoanalytic therapy, and mindfulness-based therapy, and we
                are committed to helping our clients achieve their therapeutic
                goals.
              </Text>
            </GridItem>
            <GridItem paddingBlock={"5rem"}>
              <Heading>Sessions Anywhere Anytime</Heading>
              <Text fontSize={"1.5rem"} zIndex={"1"}>
                {" "}
                Team of experienced therapists is trained in a variety of
                approaches, including cognitive-behavioral therapy,
                psychoanalytic therapy, and mindfulness- based therapy, and we
                are c ommitted to helping our clients achieve their therapeutic
                goals.
              </Text>
            </GridItem>
            <GridItem w="100%" pos={"relative"}>
              <Image pos={"absolute"} top="10vh" src={sittingchat} />
              <Image pos={"absolute"} left="10vw" src={phone} />
            </GridItem>
          </Grid>
        </Box>

        {/* section4 */}
        <Box
          w={"100vw"}
          h="150vh"
          bgColor="#17706E"
          color="white"
          position={"relative"}
          bgImage={Footer1}
          bgPos={" -300px bottom"}
          bgSize="130vw"
          zIndex={"-1"}
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: "-20px",
            width: "100%",
            bgImage: `url(${orange3})`,
            height: "40vh",
            transform: "rotate(180deg)",
            bgPosition: "bottom center ",
            bgSize: "cover",
            bgRepeat: "no-repeat",
          }}
          bgRepeat={"no-repeat"}
        >
          <Heading
            paddingTop="23rem"
            ref={ref}
            fontSize={"3.5rem"}
            textAlign={"center"}
          >
            Frequently Asked Questions
          </Heading>
          <Box w="50%" id="faq" h={"80%"} margin={"auto"}>
            <Accordion allowMultiple>
              <AccordionComp
                title={"What is Saathi?"}
                content={
                  "Saathi is a platform that uses information technology for the betterment of mental health. We are trying change the peoples' view regarding mental health and help them tackle life's challenges by providing accessible and affordable care. With Saathi, one can have easy reach to professional therapists anytime, anywhere. We are determined to provide you highly qualified therapist that you are comfortable with and have expertise knowledge regarding your issues. Click here for more information."
                }
              />
              <AccordionComp
                title={"Why should I try sathi? or Is sathi right for me"}
                content={
                  "It is a hassle in Nepal to search for the skilled Therapists not alone knowing about their expertise fields. We here in Saathi, suggest best therapists that are easily accessible for you. Not only local therapists, we also have international therapists to provide you online sessions."
                }
              />
              <AccordionComp
                title={"How do I register to see a Sathi therapist?"}
                content={
                  "Before registration, we take a quick survey to get better understanding about you. Once you complete your survey, we guide you to the registration page. You should provide all the required details to get registered in our system. "
                }
              />
              <AccordionComp
                title={"How will I communicate with my therapist?"}
                content={
                  "Once you are registered in our system, we suggest you best therapists to help you in your journey. From their profile, you could join their WhatsApp community. You can then communicate with your therapist for further details about treatment and appointment."
                }
              />
              <AccordionComp
                title={"How can I take my therapy sessions?"}
                content={
                  "We have lots of therapists which provide therapy session in various ways. You can access therapy session through chat, voice call, video call or office visit.  Based on your preferences that you have chosen during survey; we suggest therapists to help you in your comfort zone."
                }
              />
              <AccordionComp
                title={"How do I book an appointment?"}
                content={
                  "Our main goal is to suggest you the best therapist for your problems. You can then contact with the therapist to book appointments for your treatment session."
                }
              />
              <AccordionComp
                title={
                  "Will the therapist suggested by Sathi be suitable for me?"
                }
                content={
                  "All the therapists of Sathi are well experienced and licensed. We use the details that you provide in our survey during registration to match the best therapists for you. We examine the data you provided in survey and find you the therapist who have expertise to resolve your troubles."
                }
              />
              <AccordionComp
                title={
                  "Can you guarantee that I will have a positive experience with my therapist?"
                }
                content={
                  "Unfortunately, we cannot. While we do everything, we can to provide you the best matched therapist who is qualified and licensed, we are not responsible for anything that occurs in your relationship together. Please see our terms of service for more information."
                }
              />
              <AccordionComp
                title={"What if I don't like the therapist you suggested?"}
                content={
                  "Certainly. Often times learning to work with your therapist is an important part of the therapeutic process and your healing so we’d like for you to give your first therapist a try. We strive to match you with a good fit but that doesn’t always happen. If for any reason you feel like your therapist is not the best match for you please Contact Us and we’ll help you make a switch."
                }
              />
              <AccordionComp
                title={"Can I stay anonymous?"}
                content={
                  "When you sign up, we do not ask you for your full name or contact information but rather a 'nickname' created by you that will be used to identify you in the system. When you decide to start the therapy process, we will ask you for your contact information for emergency situations, such as if your therapist believes that you or someone else might be in danger. Your therapist may also request additional information about you when it is required by their licensing board guidelines. All of this data is protected by the confidentiality requirements of the therapist’s board and licensure."
                }
              />
              <AccordionComp
                title={
                  "Who are Sathi therapists? or what kinds of therapist work at Sathi?"
                }
                content={
                  "All the therapists on Sathi are professionals working across the Nepal. They all hold at least master’s degrees or above. They are all independent professionals who are licensed with most of the following requirements fulfilled: a master’s degree or above, a practicum or internship, standardized exams, and 2000 hours of supervised counseling experience."
                }
              />
              <AccordionComp
                title={"What should I do if I am in crisis?"}
                content={
                  "If this is an emergency call 1166 or Patan Hospital Helpline for Suicide Prevention: 9813476123 or TUTH Suicide Hotline: 9840021600. The suicide prevention hotline offers 24-hour support and can be called from anywhere in the Nepal. If you don't feel like you are in immediate danger, but need guidance regarding your medication, feel free to become a member of Sathi. Know more about us "
                }
              />
              {/* <a href="#">here</a> */}
            </Accordion>
          </Box>
          <Image
            src={CroodSitting}
            zIndex={10}
            top={"30%"}
            position="absolute"
          />
          <Image
            src={CroodStanding}
            top="55%"
            right={"8%"}
            position="absolute"
          />
        </Box>
        {/* section 5 footer */}

        <Box bgColor={"#701717"} height="30vh" w={"100vw"} color="white"></Box>
      </Box>
    </Box>
  );
});

export default Home;
