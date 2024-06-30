import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  Icon,
  Link,
  Avatar,
  SimpleGrid,
  chakra,
  Grid,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import google from "../../Assets/google.png";
import microsoft from "../../Assets/microsoft.jpeg";
import dell from "../../Assets/dell.jpeg";
import usa from "../../Assets/USA Flag.png";
import NavBar from "./NavBar/NavBar";
import Footer from "./FooterDiv/Footer";

const GigInfo = () => {
  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box bg="white" w="85%" mx="auto">
      {/* Replace NavBar and Footer with Chakra UI components or keep existing ones if necessary */}
      <NavBar />
      <Container maxW="container.xl" py={7}>
        <Flex direction={["column", null, "row"]} gap={12}>
          <Box flex="2">
            <HStack spacing={1} mt={2}>
              <Icon as={AiOutlineHome} w={6} h={6} />
              <Text>/</Text>
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                Home
              </Link>
            </HStack>
            <Heading as="h1" size="xl" mt={6}>
              Brief description of the gig
            </Heading>
            <HStack spacing={3} mt={4}>
              <Avatar src={dell} name="Karim A." />
              <VStack align="start">
                <Text fontSize="lg" fontWeight="medium">
                  Karim A.
                </Text>
                <HStack spacing={1}>
                  <Icon as={IoIosStar} color="yellow.400" />
                  <Text fontSize="md" fontWeight="semibold">
                    4.9
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    (68)
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Box mt={5} w={["100%", "400px"]}>
              <Slider {...sliderSettings}>
                <Image src={google} alt="Example Image" />
                <Image src={microsoft} alt="Example Image" />
              </Slider>
            </Box>
            <Heading as="h2" size="lg" mt={6}>
              About This Gig
            </Heading>
            <Text mt={2} color="gray.700">
              Example: <br />
              Are you looking for a professional Figma designer to convert your
              design files? Look no further! I offer high-quality Figma
              conversion services that are tailored to your specific needs.
            </Text>
            <Box mt={8}>
              <Heading as="h2" size="lg">
                About The Seller/Freelancer
              </Heading>
              <HStack spacing={3} mt={4}>
                <Avatar size="xl" src={dell} name="Karim A." />
                <VStack align="start">
                  <Text fontSize="lg" fontWeight="medium">
                    Karim A.
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    UX/UI Designer
                  </Text>
                  <HStack spacing={1}>
                    <Icon as={IoIosStar} color="yellow.400" />
                    <Text fontSize="md" fontWeight="semibold">
                      4.9
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      (68)
                    </Text>
                  </HStack>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => alert("Contact Seller")}
                  >
                    Contact me
                  </Button>
                </VStack>
              </HStack>
              <Box mt={6} p={4} border="1px" borderRadius="lg" borderColor="gray.300">
                <SimpleGrid columns={[1, null, 2]} spacing={4}>
                  <Box>
                    <Text fontWeight="light">From</Text>
                    <Text color="gray.500" fontWeight="semibold">
                      USA
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="light">Member since</Text>
                    <Text color="gray.500" fontWeight="semibold">
                      Oct 2022
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="light">Avg. response time</Text>
                    <Text color="gray.500" fontWeight="semibold">
                      1 hour
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="light">Last delivery</Text>
                    <Text color="gray.500" fontWeight="semibold">
                      2 days
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="light">Languages</Text>
                    <Text color="gray.500" fontWeight="semibold">
                      English, Dutch
                    </Text>
                  </Box>
                </SimpleGrid>
                <Divider my={4} />
                <Text color="gray.700">
                  Hello, my name is Leonidas and I am a skilled UX/UI designer
                  with over 5 years of experience. I specialize in creating
                  visually appealing, user-friendly, and responsive designs for
                  websites, mobile apps, and other digital products.
                </Text>
              </Box>
            </Box>
            <Box mt={8}>
              <Heading as="h2" size="lg">
                Reviews
              </Heading>
              <VStack spacing={4} mt={4}>
                {[1, 2, 3].map((_, index) => (
                  <Box key={index}>
                    <HStack spacing={3}>
                      <Avatar src={dell} name="Karim A." />
                      <VStack align="start">
                        <Text fontSize="lg" fontWeight="medium">
                          Karim A.
                        </Text>
                        <HStack spacing={1}>
                          <Image src={usa} alt="Flag" boxSize="1.5rem" />
                          <Text>United States</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={IoIosStar} color="yellow.400" />
                          <Text fontSize="md" fontWeight="semibold">
                            4.9
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text mt={2} color="gray.700">
                      Fantastic experience working with Karim. He helped us
                      create a 1:1 copy of our e-commerce website in Figma
                    </Text>
                    <HStack spacing={2} mt={4}>
                      <Text fontWeight="medium">Helpful?</Text>
                      <HStack spacing={1} cursor="pointer">
                        <Icon as={AiOutlineLike} />
                        <Text>Yes</Text>
                        <Icon as={AiOutlineDislike} />
                        <Text>No</Text>
                      </HStack>
                    </HStack>
                    <Divider my={4} />
                  </Box>
                ))}
              </VStack>
              <Button
                mt={4}
                colorScheme="blue"
                variant="outline"
                onClick={() => alert("Show More Reviews")}
              >
                Show More Reviews
              </Button>
            </Box>
          </Box>
          <Box
            flex="1"
            p={6}
            border="1px"
            borderRadius="lg"
            borderColor="gray.300"
            shadow="md"
            position="sticky"
            top="10"
            h="max-content"
          >
            <Box mb={4}>
              <Heading as="h3" size="lg">
                Image To Figma
              </Heading>
              <Heading as="h2" size="xl">
                $80
              </Heading>
            </Box>
            <Text mb={4} color="gray.700">
              Save up to 15% with Subscribe to Save <br />
              Convert 1 web page - up to 4 sections
            </Text>
            <VStack align="start" mb={4} spacing={2}>
              <HStack fontWeight="semibold">
                <Icon as={LuClock3} />
                <Text color="gray.600">2-day delivery</Text>
              </HStack>
              <HStack fontWeight="semibold">
                <Icon as={BsArrowRepeat} />
                <Text color="gray.600">2 Revisions</Text>
              </HStack>
            </VStack>
            <VStack align="start" mb={4} spacing={2}>
              <HStack>
                <Icon as={FaCheck} color="green.500" />
                <Text color="gray.600">1 page</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheck} color="gray.200" />
                <Text color="gray.600">Prototype</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheck} color="green.500" />
                <Text color="gray.600">Source file</Text>
              </HStack>
            </VStack>
            <Button
              w="full"
              colorScheme="blue"
              onClick={() => alert("Continue")}
            >
              Continue
            </Button>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default GigInfo;
