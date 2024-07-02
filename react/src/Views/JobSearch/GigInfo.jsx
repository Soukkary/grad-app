import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Avatar,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { BsArrowRepeat } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosClient from "../../Views/axios-client"; // Update the path as needed

import NavBar from "./NavBar/NavBar";
import Footer from "./FooterDiv/Footer";

const GigInfo = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchGigDetails = async (gigId) => {
    try {
      const response = await axiosClient.get(`/gigs/${gigId}`);
      if (response.status >= 200 && response.status < 300) {
        setGig(response.data);
      } else {
        throw new Error("Failed to fetch gig details");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error fetching gig details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error fetching gig details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigDetails(id);
  }, [id]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!gig) {
    return <Text>No gig details available</Text>;
  }

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box bg="white" w="85%" mx="auto">
      <NavBar />
      <Container maxW="container.xl" py={7}>
        <Flex direction={["column", null, "row"]} gap={12}>
          <Box flex="2">
            <HStack spacing={1} mt={2}>
              <Icon as={AiOutlineHome} w={6} h={6} />
              <Text>/</Text>
              <Text>Home</Text>
            </HStack>
            <Heading as="h1" size="xl" mt={6}>
              {gig.title}
            </Heading>
            <HStack spacing={3} mt={4}>
              <Avatar src={gig.user.avatar} name={gig.user.name} />
              <VStack align="start">
                <Text fontSize="lg" fontWeight="medium">
                  {gig.user.name}
                </Text>
                <HStack spacing={1}>
                  <Icon as={IoIosStar} color="yellow.400" />
                  <Text fontSize="md" fontWeight="semibold">
                    {gig.user.rating}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    ({gig.user.reviews_count})
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Box mt={5} w={["100%", "400px"]}>
              <Slider {...sliderSettings}>
                <Image key={gig.id} src={gig.img} alt={`Gig Image ${gig.title}`} />
              </Slider>
            </Box>
            <Heading as="h2" size="lg" mt={6}>
              About This Gig
            </Heading>
            <Text mt={2} color="gray.700">
              {gig.description}
            </Text>
            <Box mt={8}>
              <Heading as="h2" size="lg">
                About The Seller/Freelancer
              </Heading>
              <HStack spacing={3} mt={4}>
                <Avatar size="xl" src={gig.user.avatar} name={gig.user.name} />
                <VStack align="start">
                  <Text fontSize="lg" fontWeight="medium">
                    {gig.user.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {gig.user.title}
                  </Text>
                  <HStack spacing={1}>
                    <Icon as={IoIosStar} color="yellow.400" />
                    <Text fontSize="md" fontWeight="semibold">
                      
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      
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
                <Text color="gray.700">{gig.user.description}</Text>
              </Box>
            </Box>
          </Box>
          <Box flex="1">
            <Box p={5} border="1px" borderRadius="lg" borderColor="gray.300">
              <VStack align="start">
                <HStack>
                  <Icon as={LuClock3} />
                  <Text>1 Day Delivery</Text>
                </HStack>
                <HStack>
                  <Icon as={BsArrowRepeat} />
                  <Text>Unlimited Revisions</Text>
                </HStack>
                <HStack>
                  <Icon as={FaCheck} />
                  <Text>Include Source Code</Text>
                </HStack>
                <HStack>
                  <Icon as={FaCheck} />
                  <Text>Responsive Design</Text>
                </HStack>
              </VStack>
              <Heading as="h2" size="lg" mt={6}>
                {gig.price}$
              </Heading>
              <Button mt={4} colorScheme="blue" onClick={() => alert("Order Now")}>
                Order Now
              </Button>
              <Button mt={2} colorScheme="blue" variant="outline" onClick={() => alert("Contact Seller")}>
                Contact Seller
              </Button>
            </Box>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default GigInfo;
